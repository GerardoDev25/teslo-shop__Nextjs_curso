import { NextPage } from 'next';
import useSWR from 'swr';
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

import { SummaryTile } from '@/components/admin';
import { AdminLayout } from '@/components/layout';
import { DashboardSummaryResponse } from '@/interfaces';
import { useEffect, useState } from 'react';

const DashboarPage: NextPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>(
    '/api/admin/dashboard',
    {
      refreshInterval: 30000,
    }
  );

  const [refresIn, setRefresIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('tick');

      setRefresIn((refresh) => (refresh > 0 ? refresh - 1 : 30));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <Typography>Error al cargar la informacion</Typography>;
  }

  const {
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    lowInventory,
    productswithNoInventory,
    notPaidOrders,
  } = data!;

  return (
    <AdminLayout
      title='Dashboard'
      suTitle='estadisticas generales'
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={numberOfOrders}>
        <SummaryTile
          title={1}
          subTitle='Ordenes Totales'
          icon={
            <CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }} />
          }
        />

        <SummaryTile
          title={paidOrders}
          subTitle='Ordenes Pagadas'
          icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={notPaidOrders}
          subTitle='Ordenes pendientes'
          icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={numberOfClients}
          subTitle='Clientes'
          icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={numberOfProducts}
          subTitle='Productos'
          icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={productswithNoInventory}
          subTitle='Sin existencias'
          icon={
            <CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />
          }
        />

        <SummaryTile
          title={lowInventory}
          subTitle='Sin inventario'
          icon={
            <ProductionQuantityLimitsOutlined
              color='warning'
              sx={{ fontSize: 40 }}
            />
          }
        />

        <SummaryTile
          title={refresIn}
          subTitle='Actualizacion en'
          icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};
export default DashboarPage;
