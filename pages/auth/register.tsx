import React, { useContext, useState } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';

import { AuthLayout } from '@/components/layout';
import { validations } from '@/utils';
import { AuthContext } from '@/context';
import { useRouter } from 'next/router';

type FormData = {
  email: string;
  password: string;
  name: string;
};

const RegisterPage: NextPage = () => {
  const [showError, setShowError] = useState(false);
  const [errorMesage, setErrorMesage] = useState('');
  const { registerUser } = useContext(AuthContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onRegisterForm = async (dataForm: FormData) => {
    setShowError(false);

    const { email, name, password } = dataForm;

    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMesage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // todo: navegar a la pantalla anterior
    const destination = router.query.p?.toString() || '/';
    router.replace(destination!);
  };

  return (
    <AuthLayout title='Registrarse'>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 320, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component={'h1'}>
                Crear Cuenta
              </Typography>
              <Chip
                label={errorMesage}
                icon={<ErrorOutline />}
                color={'error'}
                className='fadeId'
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Nombre completo'
                variant='filled'
                fullWidth
                {...register('name', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'minimo 2 caracteres' },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Correo'
                type='email'
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
                type={'password'}
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
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth
                type='submit'
              >
                Registrarse
              </Button>
              <Grid item xs={12} display='flex' justifyContent='end'>
                <NextLink
                  href={
                    router.query.p
                      ? `/auth/login?p=${router.query.p}`
                      : '/auth/login'
                  }
                  passHref
                  legacyBehavior
                >
                  <Link underline='always'>ya tienes una cuenta</Link>
                </NextLink>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
