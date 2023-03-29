import React from 'react';
import useSWR from 'swr';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { AdminLayout } from '@/components/layout';
import { IOrder, IUser } from '@/interfaces';

const colums: GridColDef[] = [
  { field: 'id', headerName: 'Order Id', width: 250 },
  { field: 'email', headerName: 'Correo', width: 250 },
  { field: 'name', headerName: 'Nombre Completo', width: 300 },
  { field: 'total', headerName: 'Monto total', width: 300 },
  {
    field: 'isPaid',
    headerName: 'Pagada',
    renderCell: ({ row }: any) => {
      return row.isPaid ? (
        <Chip variant='outlined' label='Pagada' color='success' />
      ) : (
        <Chip variant='outlined' label='Pendiente' color='error' />
      );
    },
  },
  {
    field: 'noProducts',
    headerName: 'No. Productos',
    align: 'center',
    width: 150,
  },
  {
    field: 'check',
    headerName: 'Ver orden',
    renderCell: ({ row }: any) => {
      return (
        <a href={`/admin/orders/${row.id}`} target='_blank' rel="noreferrer">
          Ver Orden
        </a>
      );
    },
  },
  { field: 'createAt', headerName: 'Creada en', width: 300 },
];

const OrdersPage = () => {
  const { data = [], error } = useSWR<IOrder[]>('/api/admin/orders/');

  if (!data.length && !error) {
    return <>Loading...</>;
  }
  console.log(data);
  const rows = data.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItem,
    createAt: order.createAt,
  }));

  return (
    <AdminLayout
      title={'Ordenes'}
      suTitle={'mantenimiento de ordenes'}
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={colums}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};
export default OrdersPage;
