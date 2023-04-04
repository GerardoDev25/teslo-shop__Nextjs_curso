import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import { IProduct } from '@/interfaces';

interface Props {
  product: IProduct;
}

export const ProductCart: FC<Props> = ({ product }) => {
  const [ishovered, setIshovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const productImage = useMemo(() => {
    return ishovered ? product.images[1] : product.images[0];
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
        <NextLink
          href={`/product/${product.slug}`}
          legacyBehavior
          passHref
          prefetch={false}
        >
          <Link>
            <CardActionArea>
              {!product.inStock && (
                <Chip
                  color='primary'
                  label='No hay disponibles'
                  sx={{
                    position: 'absolute',
                    zIndex: 99,
                    top: '10px',
                    left: '10px',
                  }}
                />
              )}
              <CardMedia
                component={'img'}
                className='fadeIn'
                image={productImage}
                alt={product.title}
                onLoad={() => setIsImageLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box
        sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }}
        className='fadeIn'
      >
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`$${product.price}`}</Typography>
      </Box>
    </Grid>
  );
};
