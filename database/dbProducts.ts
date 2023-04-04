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

  product.images = product.images.map((image) => {
    return image.includes('http')
      ? image
      : `${process.env.HOST_NAME}products/${image}`;
  });

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

  const updateProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes('http')
        ? image
        : `${process.env.HOST_NAME}products/${image}`;
    });
    return product;
  });

  await db.disconnect();

  return updateProducts;
};

export const getAllProductSlug = async (): Promise<ProductSlug[]> => {
  await db.connect();

  const slugs = await ProductModel.find().select('slug -_id').lean();

  await db.disconnect();

  return slugs;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  await db.connect();

  const products = await ProductModel.find().lean();

  await db.disconnect();

  const updateProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes('http')
        ? image
        : `${process.env.HOST_NAME}products/${image}`;
    });
    return product;
  });

  return JSON.parse(JSON.stringify(updateProducts));
};
