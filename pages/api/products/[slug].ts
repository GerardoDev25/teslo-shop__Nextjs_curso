import type { NextApiRequest, NextApiResponse } from 'next';

import { db, SHOP_CONSTANTS } from '@/database';
import { IProduct } from '@/interfaces';
import { ProductModel } from '@/models';

type Data =
  | {
      message: string;
    }
  | IProduct;

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res);

    default:
      res.status(400).json({ message: 'bad request' });
      break;
  }
}

const getProductBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { slug } = req.query;

  await db.connect();

  const product = await ProductModel.findOne({ slug }).lean();

  await db.disconnect();

  if (!product) {
    return res.status(404).json({ message: 'producto no encontrado' });
  }

  product.images = product.images.map((image) => {
    return image.includes('http')
      ? image
      : `${process.env.HOST_NAME}products/${image}`;
  });

  return res.status(200).json(product);
};
