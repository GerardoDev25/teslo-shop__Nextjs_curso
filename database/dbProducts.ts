import { IProduct } from '@/interfaces';
import { ProductModel } from '@/models';
import { db } from '.';

export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();

  const product = await ProductModel.findOne({ slug }).lean();

  await db.disconnect();

  if (!product) {
    return null;
  }
  return JSON.parse(JSON.stringify(product));
};
