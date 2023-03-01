import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { ShopLayout } from '@/components/layout';
import { countries, jwt } from '@/utils';
import Cookies from 'js-cookie';

type formData = {
  address: string;
  address2: string;
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  phone: string;
  zip: string;
};

const AddressPage: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: {
      address: '',
      address2: '',
      city: '',
      country: countries[0].code,
      firstName: '',
      lastName: '',
      phone: '',
      zip: '',
    },
  });

  const onSubmitAddress = (data: formData) => {
    Cookies.set('address', data.address);
    Cookies.set('address2', data.address2 || '');
    Cookies.set('city', data.city);
    Cookies.set('country', data.country);
    Cookies.set('firstName', data.firstName);
    Cookies.set('lastName', data.lastName);
    Cookies.set('phone', data.phone);
    Cookies.set('zip', data.zip);

    router.push('/checkout/summary');
  };

  return (
    <ShopLayout
      title='direccion'
      pageDescription='confirmar direccion de destino'
    >
      <Typography variant='h1' component={'h1'}>
        Direccion
      </Typography>
      <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              type='text'
              {...register('firstName', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              label='Nombre'
              variant='filled'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('lastName', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              label='Apellido'
              variant='filled'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register('address', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
              label='Direccion'
              variant='filled'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('address2')}
              label='Direccion2 (opcional)'
              variant='filled'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register('zip', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
              label='Codigo Postal'
              variant='filled'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('city', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
              label='Ciudad'
              variant='filled'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                variant='filled'
                label='Pais'
                defaultValue={countries[0].code}
                {...register('country', {
                  required: 'Este campo es requerido',
                })}
                error={!!errors.country}
              >
                {countries.map((country) => (
                  <MenuItem value={country.code} key={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('phone', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              label='Telefono'
              variant='filled'
              fullWidth
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display='flex' justifyContent={'center'}>
          <Button
            color='secondary'
            className='circular-btn'
            size='large'
            type='submit'
          >
            Reisar Pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token = '' } = req.cookies;

  let isValidToken = false;

  try {
    await jwt.isValidToken(token);
    isValidToken = true;
  } catch (error) {
    isValidToken = false;
  }

  if (!isValidToken) {
    return {
      redirect: {
        destination: '/auth/login?p=/checkout/address',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default AddressPage;
