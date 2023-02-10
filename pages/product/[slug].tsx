import { NextPage } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layout';
import { ProductSlideshow, SizeSelector } from '@/components/products';
import { ItemCounter } from '@/components/ui';
import { useRouter } from 'next/router';
import { useProducts } from '@/hooks';

const ProducPage: NextPage = () => {
  // const router = useRouter();

  // const { products: product, isLoading } = useProducts(
  //   `/products/${router.query.slug}`
  // );

  // if (isLoading) {
  //   return <h1>Loading</h1>;
  // }

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
            <Button color='secondary' className='circular-btn'>
              Agregar al carrito
            </Button>

            {/* <Chip label='no hay disponible' color='error' variant='outlined' /> */}

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

export default ProducPage;
