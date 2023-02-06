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

      {/* <Grid container spacing={4}>
        {initialData.products.map((product) => (
          <Grid item xs={6} sm={4} key={product.slug}>
            <CardActionArea>
              <CardMedia
                component={'img'}
                image={`products/${product.images[0]}`}
                alt={product.title}
              />
            </CardActionArea>
          </Grid>
        ))}
      </Grid> */}

      <ProductList products={initialData.products as any} />
    </ShopLayout>
  );
}
export default TesloShop;
