import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { ProductModel } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

type Data =
  | {
      message: string;
    }
  | IProduct[];

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
      return getProducts(req, res);

    case 'PUT':
      return res.status(400).json({ message: 'Bad request' });

    case 'POST':
      return res.status(400).json({ message: 'Bad request' });

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await ProductModel.find().sort({ title: 'asc' }).lean();
  await db.disconnect();

  // todo actualizar imagenes
  
  return res.status(200).json(products);
};
