import { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Box, Link, Toolbar, Typography, Button } from '@mui/material';

import { UIContext } from '@/context';

export const AdminNavbar = () => {
  const { tootleSideMenu } = useContext(UIContext);

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

        <Button onClick={tootleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
