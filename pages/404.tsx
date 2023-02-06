import { ShopLayout } from '@/components/layout';
import { Box, Typography } from '@mui/material';

const custom404 = () => {
  return (
    <ShopLayout
      title={'Page not Found'}
      pageDescription={'there is not nothing to show here'}
    >
      <Box
        display={'flex'}
        justifyContent='center'
        alignItems={'center'}
        height='calc(100vh - 200px)'
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>
          404 |
        </Typography>
        <Typography marginLeft={2}>
          no encontramos ninguna pagina aqui
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default custom404;
