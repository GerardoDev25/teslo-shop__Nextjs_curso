import { NextPage, GetServerSideProps } from 'next';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import {
  AirplaneTicketOutlined,
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';

import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';

import { CartList, OrderSummary } from '@/components/cart';
import { AdminLayout } from '@/components/layout';

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { _id, isPaid, orderItems, shippingAddress } = order;

  return (
    <AdminLayout
      title='Resumen de la orden'
      suTitle={`Orden ID: ${_id}`}
      icon={<AirplaneTicketOutlined />}
    >
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
      <Grid container className='fadeIn'>
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

              <OrderSummary order={order} />

              <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                <Box display='flex' flexDirection='column'>
                  {isPaid ? (
                    <Chip
                      sx={{ my: 2, flex: 1 }}
                      label='orden ya fue Pagado'
                      variant='outlined'
                      color='success'
                      icon={<CreditScoreOutlined />}
                    />
                  ) : (
                    <Chip
                      sx={{ my: 2, flex: 1 }}
                      label='Pendiente de Pago'
                      variant='outlined'
                      color='error'
                      icon={<CreditScoreOutlined />}
                    />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id = '' } = query;

  const order = await dbOrders.getOrderById(id as string);

  if (!order) {
    return {
      redirect: {
        destination: '/orders/admin',
        permanent: false,
      },
    };
  }

  return {
    props: { order },
  };
};

export default OrderPage;
