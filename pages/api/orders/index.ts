import { db } from '@/database';
import { IOrder } from '@/interfaces';
import { ProductModel } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

type Data =
  | {
      message: string;
    }
  | IOrder;

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);

    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;
  const session: any = await getSession({ req });

  if (!session)
    return res
      .status(401)
      .json({ message: 'Debe de estar autenticado para hacer esto' });

  const productsIds = orderItems.map((p) => p._id);

  await db.connect();
  const dbProducts = await ProductModel.find({ _id: { $in: productsIds } });

  try {
    const subTotal = orderItems.reduce((prev, curr) => {
      const currentPrice = dbProducts.find((prod) => {
        prod._id === curr._id;
      })?.price;

      if (!currentPrice) {
        throw new Error('Verifique el carrito de nuevo');
      }
      return currentPrice * curr.price + prev;
    }, 0);
  } catch (error) {}

  res.status(201).json(req.body);
};
