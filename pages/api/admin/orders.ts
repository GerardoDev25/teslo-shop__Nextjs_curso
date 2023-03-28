import { db } from '@/database';
import { IOrder } from '@/interfaces';
import { OrderModel } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

type Data =
  | {
      message: string;
    }
  | IOrder[];

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session: any = await getSession({ req });

  if (!session)
    return res.status(401).json({
      message: 'Debe de estar autorizado para acceder a este recurso',
    });

  const validRoles = ['admin', 'super-user'];

  if (!validRoles.includes(session.user.role)) {
    return res.status(401).json({
      message: 'Debe de estar autorizado para acceder a este recurso',
    });
  }

  switch (req.method) {
    case 'GET':
      return getOrders(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const orders = await OrderModel.find()
    .sort({ createAt: 'desc' })
    .populate('user', 'name email')
    .lean();

  await db.disconnect();

  res.status(200).json(orders);
};
