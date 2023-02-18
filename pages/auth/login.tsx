import React from 'react';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '@/components/layout';
import { validations } from '@/utils';
import { tesloApi } from '@/api';
import axios from 'axios';

type FormData = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });

      const { token, user } = data;

      console.log({ token, user });
    } catch (error) {
      console.log(error);
      console.log('error en las credenciales');
    }
  };

  return (
    <AuthLayout title='Ingresar'>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 320, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Iniciar Secion
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='email'
                label='Correo'
                variant='filled'
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Contarseña'
                type='password'
                variant='filled'
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'minimo 6 caracteres' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
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
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
