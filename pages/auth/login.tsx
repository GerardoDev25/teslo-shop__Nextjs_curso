import { AuthLayout } from '@/components/layout';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import NextLink from 'next/link';
import React from 'react';

const LoginPage: NextPage = () => {
  return (
    <AuthLayout title='Ingresar'>
      <Box sx={{ width: 320, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component={'h1'}>
              Iniciar Secion
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label='Correo' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Contarseña'
              type={'password'}
              variant='filled'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color='secondary'
              className='circular-btn'
              size='large'
              fullWidth
            >
              Ingresar
            </Button>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href='/auth/register' passHref legacyBehavior>
                <Link underline='always'>Registrarse</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
