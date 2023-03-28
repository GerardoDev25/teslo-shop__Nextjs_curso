import React from 'react';
import useSWR from 'swr';
import { PeopleOutline } from '@mui/icons-material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayout } from '@/components/layout';
import { Grid, MenuItem, Select } from '@mui/material';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/api';

const User = () => {
  const { data = [], error } = useSWR<IUser[]>('/api/admin/users');

  if (!data && !error) return <></>;

  const rows = data!.map((user) => ({
    id: user._id,
    email: user.email,
    role: user.role,
    name: user.name,
  }));

  const onRoleUpdate = async (userId: string, newRole: string) => {
    try {
      await tesloApi.put('/admin/users/', { userId, role: newRole });
    } catch (error) {
      console.log(error);
      alert('no se pudo actualizar el role del useario');
    }
  };

  const colums: GridColDef[] = [
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'name', headerName: 'Nombre Completo', width: 300 },
    {
      field: 'role',
      headerName: 'Rol',
      width: 300,
      renderCell: ({ row }: any) => {
        return (
          <Select
            value={row.role}
            label='Rol'
            sx={{ width: '300px' }}
            onChange={({ target }) => onRoleUpdate(row.id, target.value)}
          >
            <MenuItem value={'admin'}>Admin</MenuItem>
            <MenuItem value={'client'}>Client</MenuItem>
            <MenuItem value={'super-user'}>Super-user</MenuItem>
          </Select>
        );
      },
    },
  ];

  return (
    <AdminLayout
      title={'Usuarios'}
      suTitle={'mantenimiento de usuarios'}
      icon={<PeopleOutline />}
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
export default User;
