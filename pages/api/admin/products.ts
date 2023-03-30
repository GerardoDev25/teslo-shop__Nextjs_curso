import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { ProductModel } from '@/models';
import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

type Data =
  | {
      message: string;
    }
  | IProduct
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
      return updateProduct(req, res);

    case 'POST':
      return createProduct(req, res);

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

const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = '', images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: 'El id del producto no es valido' });
  }

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: 'es necesario almenos dos imagenes' });
  }

  // todo verificar images

  try {
    await db.connect();

    const product = await ProductModel.findById(_id);

    if (!product) {
      await db.disconnect();
      return res.status(404).json({ message: 'producto no encontrado' });
    }

    // todo eliminar fotos en cloudinary

    await product.update(req.body);

    await db.disconnect();
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res
      .status(400)
      .json({ message: 'no se pudo realizar la operacion' });
  }
};

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IProduct;

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: 'es necesario almenos dos imagenes' });
  }
  // todo eliminar fotos en cloudinary

  try {
    await db.connect();

    const productInDb = await ProductModel.findOne({ slug: req.body.slug });

    if (productInDb) {
      return res
        .status(400)
        .json({ message: 'ya existe un producto con ese slug' });
    }

    const product = new ProductModel(req.body);
    await product.save();

    await db.disconnect();
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res
      .status(400)
      .json({ message: 'no se pudo realizar la operacion' });
  }
};
