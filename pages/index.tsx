import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '@/components/layout';
import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';
import { FullScreenLoading } from '@/components/ui';

const HomePage: NextPage = () => {
  const { isError, isLoading, products } = useProducts('/products');

  return (
    <ShopLayout
      title='Teslo-Shop'
      pageDescription='encuentra los mujores productos aqui'
    >
      <Typography variant='h1' component='h1'>
        Teslo-shop
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};
export default HomePage;
