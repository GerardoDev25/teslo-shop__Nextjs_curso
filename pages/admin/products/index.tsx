import React from 'react';
import NextLink from 'next/link';
import useSWR from 'swr';
import { CategoryOutlined } from '@mui/icons-material';
import { CardMedia, Grid, Link } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { AdminLayout } from '@/components/layout';
import { IProduct } from '@/interfaces';

const colums: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Foto',
    renderCell: ({ row }: any) => {
      return (
        <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
          <CardMedia
            component={'img'}
            className='fadeIn'
            alt={row.title}
            image={`/products/${row.img}`}
          />
        </a>
      );
    },
  },
  {
    field: 'title',
    headerName: 'Titulo',
    width: 300,
    renderCell: ({ row }: any) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} legacyBehavior passHref>
          <Link underline='always'>{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: 'gender', headerName: 'Genero' },
  { field: 'type', headerName: 'Tipo' },
  { field: 'inStock', headerName: 'Inventario' },
  { field: 'price', headerName: 'Precio' },
  { field: 'sizes', headerName: 'Tallas', width: 250 },
];

const ProductsPage = () => {
  const { data = [], error } = useSWR<IProduct[]>('/api/admin/products/');

  if (!data.length && !error) {
    return <>Loading...</>;
  }
  const rows = data.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(' ,'),
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title={`Products (${data.length})`}
      suTitle={'Mantenimiento de Productos'}
      icon={<CategoryOutlined />}
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
export default ProductsPage;
