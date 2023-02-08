import { NextPage } from 'next';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from '@mui/x-data-grid';
import { Chip, Grid, Link, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layout';
import NextLink from 'next/link';

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
        <NextLink legacyBehavior href={`/orders/${params.row.id}`} passHref>
          <Link underline='always'>Ver order</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullName: 'Grardo Miranda' },
  { id: 2, paid: false, fullName: 'Grardo Miranda' },
  { id: 3, paid: false, fullName: 'Grardo Miranda' },
  { id: 4, paid: true, fullName: 'Grardo Miranda' },
  { id: 5, paid: false, fullName: 'Grardo Miranda' },
  { id: 6, paid: true, fullName: 'Grardo Miranda' },
  { id: 7, paid: false, fullName: 'Grardo Miranda' },
];

const HistoryPage: NextPage = () => {
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

export default HistoryPage;
