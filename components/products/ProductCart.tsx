import { FC, useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import { IProduct } from '@/interfaces';

interface Props {
  product: IProduct;
}

export const ProductCart: FC<Props> = ({ product }) => {
  const [ishovered, setIshovered] = useState(false);

  const productImage = useMemo(() => {
    return ishovered
      ? `products/${product.images[1]} `
      : `products/${product.images[0]} `;
  }, [ishovered, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIshovered(true)}
      onMouseLeave={() => setIshovered(false)}
    >
      <Card>
        <CardActionArea>
          <CardMedia
            component={'img'}
            className='fadeIn'
            image={productImage}
            alt={product.title}
          />
        </CardActionArea>
      </Card>

      <Box sx={{ mt: 1 }} className='fadeIn'>
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`$${product.price}`}</Typography>
      </Box>
    </Grid>
  );
};
