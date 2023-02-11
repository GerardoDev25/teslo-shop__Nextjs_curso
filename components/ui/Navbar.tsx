import { useContext, useState } from 'react';
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
  Input,
  InputAdornment,
} from '@mui/material';
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';

import { UIContext } from '@/context';

export const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisivle, setIsSearchVisivle] = useState(false);

  const { pathname, push } = useRouter();
  const { tootleSideMenu } = useContext(UIContext);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    push(`/search/${searchTerm}`);
  };

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

        <Box
          sx={{
            display: isSearchVisivle ? 'none' : { xs: 'none', sm: 'block' },
          }}
          className='fadeIn'
        >
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

        {/* pantallas grandes */}
        {isSearchVisivle ? (
          <Input
            sx={{
              display: { xs: 'none', sm: 'flex' },
            }}
            autoFocus
            className='fadeIn'
            onKeyPress={(e) => e.key === 'Enter' && onSearchTerm()}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            type='text'
            placeholder='Buscar...'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={() => setIsSearchVisivle(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisivle(true)}
            className='fadeIn'
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* pantallas pequeñas */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={tootleSideMenu}
        >
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
