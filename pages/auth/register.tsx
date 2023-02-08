import { AuthLayout } from '@/components/layout';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import NextLink from 'next/link';
import React from 'react';

const RegisterPage: NextPage = () => {
  return (
    <AuthLayout title='Registrarse'>
      <Box sx={{ width: 320, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component={'h1'}>
              Crear Cuenta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label='Nombre completo' variant='filled' fullWidth />
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
              Registrarse
            </Button>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href='/auth/login' passHref legacyBehavior>
                <Link underline='always'>ya tienes una cuenta</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
