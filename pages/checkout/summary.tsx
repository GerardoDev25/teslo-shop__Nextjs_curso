import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import {
  Box,
  Button,
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
import { CartContext } from '@/context';
import { ShippingAddress } from '@/interfaces';

const SummaryPage: NextPage = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { shippingAddress, numberOfItem, createOrder } =
    useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get('firstName')) router.push('/checkout/address');
  }, [router]);

  if (!shippingAddress) return <></>;

  const {
    address,
    city,
    country,
    firstName,
    lastName,
    phone,
    zip,
    address2,
  }: ShippingAddress = shippingAddress!;

  const onCreateOrder = async () => {
    setIsPosting(true);
    const { hasError, message } = await createOrder();
    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }
    router.replace(`/orders/${message}`)
  };

  return (
    <ShopLayout title='Resumen de compra' pageDescription='resumen de la orden'>
      <Typography variant='h1' component={'h1'}>
        Resumen de la orden
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                Resumen ({numberOfItem}{' '}
                {numberOfItem === 1 ? 'Producto' : 'Productos'})
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display={'flex'} justifyContent='space-between'>
                <Typography variant='subtitle1'>
                  Direccion de entrega
                </Typography>
                <NextLink legacyBehavior href={'/checkout/address'} passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>

              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>
                {' '}
                {address}
                {address2 ? ', ' + address2 : ''}
              </Typography>
              <Typography>
                {' '}
                {city} {zip}
              </Typography>
              <Typography>
                {/* {countries.find((item) => item.code === country)?.name} */}
                {country}
              </Typography>
              <Typography> {phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display={'flex'} justifyContent='end'>
                <NextLink legacyBehavior href={'/cart'} passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                <Button
                  color='secondary'
                  className='circular-btn'
                  fullWidth
                  onClick={onCreateOrder}
                  disabled={isPosting}
                >
                  Confirmar Orden
                </Button>
                <Chip
                  color='error'
                  label={errorMessage}
                  sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
