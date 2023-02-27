import React, { useContext, useState } from 'react';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '@/components/layout';
import { validations } from '@/utils';
import { AuthContext } from '@/context';
import { useRouter } from 'next/router';

type FormData = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const [showError, setShowError] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    // todo: navegar a la pantalla anterior
    const destination = router.query.p?.toString() || '/';
    router.replace(destination!);
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
              <Chip
                label='email o contrasenña incorrecta'
                icon={<ErrorOutline />}
                color={'error'}
                className='fadeId'
                sx={{ display: showError ? 'flex' : 'none' }}
              />
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
                <NextLink
                  href={
                    router.query.p
                      ? `/auth/register?p=${router.query.p}`
                      : '/auth/register'
                  }
                  passHref
                  legacyBehavior
                >
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
