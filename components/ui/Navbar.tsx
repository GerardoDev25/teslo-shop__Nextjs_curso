import NextLink from 'next/link';
import { useRouter } from 'next/router';

import {
  AppBar,
  Box,
  Link,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
} from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useContext } from 'react';
import { UIContext } from '@/context';

export const Navbar = () => {
  const { tootleSideMenu } = useContext(UIContext);
  const { pathname } = useRouter();

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' legacyBehavior passHref>
          <Link display='flex' alignItems='center'>
            <Typography variant='h6'>Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink href='/category/men' legacyBehavior passHref>
            <Link>
              <Button color={pathname === '/category/men' ? 'primary' : 'info'}>
                Hombres
              </Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women' legacyBehavior passHref>
            <Link>
              <Button
                color={pathname === '/category/women' ? 'primary' : 'info'}
              >
                Mujeres
              </Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kid' legacyBehavior passHref>
            <Link>
              <Button color={pathname === '/category/kid' ? 'primary' : 'info'}>
                Niños
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href='/cart' legacyBehavior passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color='secondary'>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={tootleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
