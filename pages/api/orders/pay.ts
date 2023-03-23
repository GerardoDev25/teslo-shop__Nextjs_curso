import { db } from '@/database';
import { IPaypal } from '@/interfaces';
import { OrderModel } from '@/models';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res);

    default:
      return res.status(400).json({ message: 'bad request' });
  }
}

const getPaypalBeaterToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET_ID;

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');

  const body = new URLSearchParams('grant_type=client_credentials');

  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || '',
      body,
      {
        headers: {
          'Content-Type': 'application/x-form-urlencoded',
          'Authorization': `Basic ${base64Token}`,
        },
      }
    );

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else console.log(error);
    return null;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // todo validar session del usuario
  // todo validar mongo id

  const paypalBeaterToken = await getPaypalBeaterToken();

  if (!paypalBeaterToken) {
    return res.status(400).json({ message: 'no se pudo confirmar el token' });
  }

  const { transactionId = '', orderId = '' } = req.body;

  const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        'Authorization': `Bearer ${paypalBeaterToken}`,
      },
    }
  );

  if (data.status !== 'COMPLETED') {
    return res.status(401).json({ message: 'Ordern no reconocida' });
  }

  await db.connect();

  const dbOrder = await OrderModel.findById(orderId);
  if (!dbOrder) {
    await db.disconnect();
    return res.status(401).json({ message: 'Ordern no existe un la db' });
  }

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect();
    return res
      .status(401)
      .json({ message: 'los montos de paypal y la ordern no coinciden' });
  }

  dbOrder.transactionId = transactionId;
  dbOrder.isPaid = true;
  await dbOrder.save();

  await db.disconnect();

  return res.status(200).json({ message: 'Ordern pagada' });
};
