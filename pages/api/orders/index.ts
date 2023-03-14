import { db } from '@/database';
import { IOrder } from '@/interfaces';
import { OrderModel, ProductModel } from '@/models';
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
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(
        (prod) => prod._id.toString() === current._id
      )?.price;
      if (!currentPrice) {
        throw new Error('Verifique el carrito de nuevo, producto no existe');
      }

      return currentPrice * current.quantity + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = subTotal + (taxRate + 1);

    if (total !== backendTotal) {
      throw new Error('El total no cuadra con el monto ');
    }

    const userId = session.user.id;
    const newOrder = new OrderModel({
      ...req.body,
      isPaid: false,
      user: userId,
      paymentResult: 'pending',
      paidAt: 'none',
    });
    await newOrder.save();

    await db.disconnect();

    return res.status(201).json(newOrder);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    return res
      .status(400)
      .json({ message: error.message || 'revise los logs del servidor' });
  }

  // return res.status(201).json(req.body);
};
