import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layout';
import { ProductSlideshow, SizeSelector } from '@/components/products';
import { ItemCounter } from '@/components/ui';
import { IProduct } from '@/interfaces';
import { dbProducts } from '@/database';

interface Props {
  product: IProduct;
}

const ProducPage: NextPage<Props> = ({ product }) => {
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
              <ItemCounter />
              <SizeSelector
                // selectedSize={product.sizes[0]}
                sizes={product.sizes}
              />
            </Box>

            {/* agregar al carrito */}

            {product.inStock ? (
              <Button color='secondary' className='circular-btn'>
                Agregar al carrito
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
