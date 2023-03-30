import { Box, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

import { SideMenu } from '../ui';
import { AdminNavbar } from '../admin';
import Head from 'next/head';

interface Props {
  title: string;
  suTitle: string;
  icon?: JSX.Element;
  children: ReactNode;
}

export const AdminLayout: FC<Props> = (props) => {
  const { suTitle, title, icon, children } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={suTitle} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={suTitle} />
      </Head>
      <nav>
        <AdminNavbar />
      </nav>

      <SideMenu />

      <main
        style={{ margin: '80px auto', maxWidth: '1440px', padding: '0 30px' }}
      >
        <Box display={'flex'} flexDirection='column'>
          <Typography variant='h1' component={'h1'}>
            {icon} {title}
          </Typography>
          <Typography sx={{ mb: 1 }}>{suTitle}</Typography>
        </Box>
        <Box className='fadeIn'>{children}</Box>
      </main>
    </>
  );
};
