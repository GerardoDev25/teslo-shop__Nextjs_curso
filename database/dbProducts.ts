import { IProduct } from '@/interfaces';
import { ProductModel } from '@/models';
import { db } from '.';
interface ProductSlug {
  slug: string;
}

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

export const getProductByTerm = async (term: string): Promise<IProduct[]> => {
  term = term.toString().toLowerCase();

  await db.connect();

  const products = await ProductModel.find({
    $text: { $search: term },
  })
    .select('title images price instock slug -_id')
    .lean();

  await db.disconnect();

  return products;
};

export const getAllProductSlug = async (): Promise<ProductSlug[]> => {
  await db.connect();

  const slugs = await ProductModel.find().select('slug -_id').lean();

  await db.disconnect();

  return slugs;
};
