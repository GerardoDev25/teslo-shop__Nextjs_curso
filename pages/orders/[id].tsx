import { NextPage } from 'next';
import NextLink from 'next/link';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layout';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';

const OrderPage: NextPage = () => {
  return (
    <ShopLayout
      title='Resumen de la orden'
      pageDescription='resumen de la orden'
    >
      <Typography variant='h1' component={'h1'}>
        Orden: ABC123
      </Typography>

      {/* <Chip
        sx={{ my: 2 }}
        label='Pendiente de pago'
        variant='outlined'
        color='error' 
        icon={<CreditCardOffOutlined />}
      /> */}
      <Chip
        sx={{ my: 2 }}
        label='orden ya fue Pagado'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen (3 productos)</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display={'flex'} justifyContent='space-between'>
                <Typography variant='subtitle1'>
                  {' '}
                  Direccion de entrega
                </Typography>
                <NextLink legacyBehavior href={'/checkout/address'} passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>

              <Typography> Gerardo Miranda</Typography>
              <Typography> en algun lugar</Typography>
              <Typography> alguna direccion</Typography>
              <Typography> +1 4534534534</Typography>
              <Typography> Bolivia</Typography>
              <Typography> +1 43535345</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display={'flex'} justifyContent='end'>
                <NextLink legacyBehavior href={'/cart'} passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <h1>Pagar</h1>
                <Chip
                  sx={{ my: 2 }}
                  label='orden ya fue Pagado'
                  variant='outlined'
                  color='success'
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
