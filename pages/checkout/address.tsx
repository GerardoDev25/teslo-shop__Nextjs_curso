import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layout';
import { countries, jwt } from '@/utils';
import Cookies from 'js-cookie';
import { useContext, useEffect } from 'react';
import { CartContext } from '@/context';

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

const getInitialCountry = () => {
  type CountryT = {
    name: string;
    code: string;
  };

  const cookieCountry = Cookies.get('country');

  const country: CountryT | undefined = countries.find(
    (c) => c?.code === cookieCountry
  );

  // console.log({ cookieCountry, country });

  return country ? country.name : countries[0].name;
};

const getAddressFromCookies = (): formData => {
  return {
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || countries[0].code,
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    phone: Cookies.get('phone') || '',
    zip: Cookies.get('zip') || '',
  };
};

const AddressPage: NextPage = () => {
  const router = useRouter();
  const { updateAdress } = useContext(CartContext);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: {
      address: '',
      address2: '',
      city: '',
      country: '',
      firstName: '',
      lastName: '',
      phone: '',
      zip: '',
    },
  });

  useEffect(() => {
    reset(getAddressFromCookies());
  }, [reset]);

  const onSubmitAddress = (data: formData) => {
    updateAdress(data);
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
            {/* <FormControl fullWidth> */}
            <TextField
              // select
              variant='filled'
              label='Pais'
              // defaultValue={Cookies.get('country') || countries[0].name}
              fullWidth
              {...register('country', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.country}
              helperText={errors.country?.message}
            >
              {/* {countries.map((country) => (
                  <MenuItem value={country.code} key={country.code}>
                    {country.name}
                  </MenuItem>
                ))} */}
            </TextField>
            {/* </FormControl> */}
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

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token = '' } = req.cookies;

//   let isValidToken = false;

//   try {
//     await jwt.isValidToken(token);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if (!isValidToken) {
//     console.log();
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/address',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default AddressPage;
