import { db, seedDataBase } from '@/database';
import { OrderModel, ProductModel, UserModel } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'no tiene acceso a este api' });
  }
  try {
    await db.connect();

    await UserModel.deleteMany();
    await UserModel.insertMany(seedDataBase.initialData.users);

    await ProductModel.deleteMany();
    await ProductModel.insertMany(seedDataBase.initialData.products);

    await OrderModel.deleteMany();

    await db.disconnect();

    return res.status(200).json({ message: 'proceso realisado correctamente' });
  } catch (error: any) {
    console.log(error.message);

    res.status(500).json({ message: 'seed error' });
  }
}
