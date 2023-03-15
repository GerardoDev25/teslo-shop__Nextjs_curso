import { NextPage, GetServerSideProps } from 'next';
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
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';
import { getSession } from 'next-auth/react';

import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';

import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layout';

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const {
    _id,
    isPaid,
    numberOfItem,
    orderItems,
    shippingAddress,
    subTotal,
    tax,
    total,
    paidAt,
    user,
  } = order;

  return (
    <ShopLayout
      title='Resumen de la orden'
      pageDescription='resumen de la orden'
    >
      <Typography variant='h1' component={'h1'}>
        Orden: {_id}
      </Typography>
      {isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label='orden ya fue Pagado'
          variant='outlined'
          color='success'
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label='Pendiente de pago'
          variant='outlined'
          color='error'
          icon={<CreditCardOffOutlined />}
        />
      )}
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList products={orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                Resumen ({orderItems.length}{' '}
                {orderItems.length === 1 ? 'Producto' : 'Productos'})
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display={'flex'} justifyContent='space-between'>
                <Typography variant='subtitle1'>
                  Direccion de la Entrega
                </Typography>
              </Box>

              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.address}
                {shippingAddress.address2
                  ? ', ' + shippingAddress.address2
                  : ''}
              </Typography>
              <Typography>
                {shippingAddress.city}, {shippingAddress.zip}
              </Typography>

              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              {/* <Box display={'flex'} justifyContent='end'>
                <NextLink legacyBehavior href={'/cart'} passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box> */}

              <OrderSummary order={order} />

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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query;

  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id as string);

  if (!order) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    };
  }

  if (order.user !== session.user.id) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    };
  }

  return {
    props: { order },
  };
};

export default OrderPage;
