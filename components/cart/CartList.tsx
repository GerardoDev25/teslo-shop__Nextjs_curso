import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';

import { ItemCounter } from '../ui';
import { FC, useContext } from 'react';
import { CartContext } from '@/context';
import { ICartProduct, IOrderItems } from '@/interfaces';

interface Props {
  editable?: boolean;
  products?: IOrderItems[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
  const {
    cart = [],
    updateCartQuantity,
    removeCartProduct,
  } = useContext(CartContext);

  const productsToShow = products || cart;

  const onCartQuantityValue = (product: ICartProduct, value: number) => {
    product.quantity += value;
    updateCartQuantity(product);
  };

  return (
    <>
      {productsToShow.map((product) => (
        <Grid
          key={product.slug + product.size}
          spacing={2}
          sx={{ mb: 1 }}
          container
        >
          <Grid item xs={3}>
            {/* llevar a la pagina del producto */}
            <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={product.images}
                    component='img'
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display={'flex'} flexDirection='column'>
              <Typography variant='body1'>{product.title}</Typography>
              <Typography variant='body1'>
                Talla: <strong>{product.size}</strong>
              </Typography>
              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  updateQuantity={(value) =>
                    onCartQuantityValue(product as ICartProduct, value)
                  }
                  maxValue={10}
                />
              ) : (
                <Typography variant='h5'>
                  {product.quantity}
                  {product.quantity > 1 ? ' productos' : ' producto'}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display='flex'
            alignItems='center'
            flexDirection={'column'}
          >
            <Typography variant='subtitle1'>${`${product.price}`}</Typography>
            {editable && (
              <Button
                variant='text'
                color='secondary'
                onClick={() => removeCartProduct(product as ICartProduct)}
              >
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
