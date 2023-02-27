import { NextPage } from 'next';
import NextLink from 'next/link';

import { ShopLayout } from '@/components/layout';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';

const EntryPage: NextPage = () => {
  return (
    <ShopLayout
      title='Carrito vacio'
      pageDescription='no hay articulos de compra'
    >
      <Box
        display={'flex'}
        justifyContent='center'
        alignItems={'center'}
        height='calc(100vh - 200px)'
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography> su carrito esta vacio</Typography>
          <NextLink href='/' passHref legacyBehavior>
            <Link typography='h4' color='secondary'>
              Regresar
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EntryPage;
