import { Typography } from '@mui/material';
import { ShopLayout } from '@/components/layout';
import { initialData } from '@/database/products';
import { ProductList } from '@/components/products';
import { NextPage } from 'next';

import useSWR from 'swr';

const fetcher = (...args: [key: string]) =>
  fetch(...args).then((res) => res.json());

const HomePage: NextPage = () => {
  const { data, error, isLoading } = useSWR('/api/products/', fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log(data);

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

      <ProductList products={data} />
    </ShopLayout>
  );
};
export default HomePage;
