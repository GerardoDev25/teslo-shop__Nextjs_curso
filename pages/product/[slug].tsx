import { useContext, useState } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layout';
import { ProductSlideshow, SizeSelector } from '@/components/products';
import { ItemCounter } from '@/components/ui';
import { ICartProduct, IProduct, ISize } from '@/interfaces';
import { dbProducts } from '@/database';
import { CartContext } from '@/context';

interface Props {
  product: IProduct;
}

const ProducPage: NextPage<Props> = ({ product }) => {
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    images: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const { addProductToCart } = useContext(CartContext);

  const router = useRouter();

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct({ ...tempCartProduct, size });
  };

  const updateQuantity = (value: number) => {
    setTempCartProduct({
      ...tempCartProduct,
      quantity: tempCartProduct.quantity + value,
    });
  };

  const onAddToCart = () => {
    addProductToCart(tempCartProduct);
    router.push('/cart');
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            {/* titulas */}
            <Typography variant='h1' component={'h1'}>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component={'h2'}>
              {`$${product.price}`}
            </Typography>

            {/* cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                maxValue={product.inStock}
                updateQuantity={updateQuantity}
              />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={onSelectedSize}
              />
            </Box>

            {/* agregar al carrito */}

            {product.inStock ? (
              <Button
                color='secondary'
                className='circular-btn'
                disabled={!tempCartProduct.size}
                onClick={onAddToCart}
              >
                {tempCartProduct.size
                  ? 'Agregar al carrito'
                  : 'seleccione una talla'}
              </Button>
            ) : (
              <Chip
                label='no hay disponible'
                color='error'
                variant='outlined'
              />
            )}
            {/* descriccion */}
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2' fontWeight={700}>
                Descriccion
              </Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { slug = '' } = ctx.params as { slug: string };

//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { product },
//   };
// };

export const getStaticPaths: GetStaticPaths = async () => {
  const productsSlugs = await dbProducts.getAllProductSlug();

  return {
    paths: productsSlugs.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { product },
    revalidate: 86400,
  };
};

export default ProducPage;
