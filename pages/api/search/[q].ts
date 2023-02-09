import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { ProductModel } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

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
      return searchProducts(req, res);

    default:
      return res.status(400).json({ message: 'bad request' });
  }
}

async function searchProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  let { q = '' } = req.query;

  if (!q.length) {
    return res
      .status(400)
      .json({ message: 'debe expesificar el query de busqueda' });
  }

  q = q.toString().toLowerCase();

  await db.connect();

  const products = await ProductModel.find({
    $text: { $search: q },
  })
    .select('title images price instock slug -_id')
    .lean();

  await db.disconnect();

  return res.status(200).json(products);
}
