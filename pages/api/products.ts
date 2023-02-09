import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { ProductModel } from '@/models';

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);

    default:
      res.status(400).json({ message: 'bad request' });
      break;
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const products = await ProductModel.find()
    .select('title images price inStock slug -_id')
    .lean();

  await db.disconnect();
  res.status(200).json(products);
};
