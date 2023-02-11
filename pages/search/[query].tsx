import { NextPage, GetServerSideProps } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '@/components/layout';
import { ProductList } from '@/components/products';
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';

interface Props {
  products: IProduct[];
}

const SearchPage: NextPage<Props> = ({ products }) => {
  // const { isError, isLoading, products } = useProducts(`/search/men`);

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
      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query } = params as { query: string };

  if (!query.length) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductByTerm(query);

  // todo retornar otros productos

  return {
    props: {
      products,
    },
  };
};

export default SearchPage;
