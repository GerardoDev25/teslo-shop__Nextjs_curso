import { NextPage, GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { ShopLayout } from '@/components/layout';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';

const colums: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Nombre Completo', width: 300 },
  {
    field: 'paid',
    headerName: 'pagada',
    description: 'muestra informacion si esta pagada',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color='success' label='Pagada' variant='outlined' />
      ) : (
        <Chip color='error' label='no Pagada' variant='outlined' />
      );
    },
  },

  {
    field: 'orden',
    headerName: 'Ordenes',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink
          legacyBehavior
          href={`/orders/${params.row.orderId}`}
          passHref
        >
          <Link underline='always'>Ver order</Link>
        </NextLink>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, index) => ({
    id: index + 1,
    paid: order.isPaid,
    fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    orderId: order._id,
  }));

  return (
    <ShopLayout
      title='historial de ordenes'
      pageDescription='historial de ordenes de clientes'
    >
      <Typography>Historial de ordenes</Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={colums}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrderByUser(session.user.id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
