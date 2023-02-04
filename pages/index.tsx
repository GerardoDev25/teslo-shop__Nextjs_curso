import { Typography } from '@mui/material';
import { ShopLayout } from '@/components/layout';

function TesloShop() {
  return (
    <ShopLayout title={'Teslo-Shop'} pageDescription={'encuentra los mujores productos aqui'}>
      <Typography variant='h1' component='h1'>
        Teslo-shop
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
    </ShopLayout>
  );
}
export default TesloShop;
