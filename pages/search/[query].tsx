import { NextPage, GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layout';
import { ProductList } from '@/components/products';
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';

interface Props {
  products: IProduct[];
  existProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, existProducts, query }) => {
  return (
    <ShopLayout
      title='Teslo-Shop Search'
      pageDescription='encuentra los mujores productos aqui'
    >
      <Typography variant='h1' component='h1'>
        Buscar Producto
      </Typography>

      <Box display={'flex'} sx={{ mb: 3 }}>
        <Typography variant='h2' sx={{ mb: 1 }}>
          {existProducts ? 'Termino:' : 'No se encontraron productos'}
        </Typography>
        <Typography variant='h2' sx={{ ml: 1 }} color='secondary'>
          {query}
        </Typography>
      </Box>

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
  const existProducts = products.length > 0;

  if (!existProducts) {
    // products = await dbProducts.getAllProducts();
    products = await dbProducts.getProductByTerm('shirt');
  }

  return {
    props: {
      products,
      existProducts,
      query,
    },
  };
};

export default SearchPage;
