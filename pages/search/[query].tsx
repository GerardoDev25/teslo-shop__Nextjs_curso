import { Typography } from '@mui/material';
import { ShopLayout } from '@/components/layout';
import { ProductList } from '@/components/products';
import { NextPage } from 'next';
import { useProducts } from '@/hooks';
import { FullScreenLoading } from '@/components/ui';

const SearchPage: NextPage = () => {
  const { isError, isLoading, products } = useProducts(`/search/men`);

  return (
    <ShopLayout
      title='Teslo-Shop Search'
      pageDescription='encuentra los mujores productos aqui'
    >
      <Typography variant='h1' component='h1'>
        Buscar Producto
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        ASDASDASFSDF
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};
export default SearchPage;
