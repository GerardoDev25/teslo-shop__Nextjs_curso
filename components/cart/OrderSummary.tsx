import { FC, useContext } from 'react';
import { Grid, Typography } from '@mui/material';

import { CartContext } from '@/context';
import { currency } from '@/utils';
import { IOrder } from '@/interfaces';

interface Props {
  order?: IOrder;
}

export const OrderSummary: FC<Props> = ({ order }) => {
  const orderFromContext = useContext(CartContext);
  const orderToShow = order || orderFromContext;
  const { numberOfItem, subTotal, total, tax } = orderToShow;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Producto</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent={'end'}>
        <Typography>
          {numberOfItem} {numberOfItem > 1 ? 'productos' : 'producto'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent={'end'}>
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          Inpuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
        </Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent={'end'}>
        <Typography>{currency.format(tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography variant='subtitle1'>Total</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent={'end'}>
        <Typography variant='subtitle1'>{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};
