import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '@/components/layout';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';

import { useProducts } from '@/hooks';

const MenPage: NextPage = () => {
  const { isError, isLoading, products } = useProducts('/products?gender=men');

  return (
    <ShopLayout
      title='teslo-shop Men'
      pageDescription='aqui encuentra los mejores productos para hombres'
    >
      <Typography variant='h1' component='h1'>
        Teslo-shop Hombres
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Todos los Productos
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
