import { CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { ShopLayout } from '@/components/layout';
import { initialData } from '@/database/products';
import { ProductList } from '@/components/products';

function TesloShop() {
  return (
    <ShopLayout
      title={'Teslo-Shop'}
      pageDescription={'encuentra los mujores productos aqui'}
    >
      <Typography variant='h1' component='h1'>
        Teslo-shop
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Todos los productos
      </Typography>

      <ProductList products={initialData.products as any} />
    </ShopLayout>
  );
}
export default TesloShop;
