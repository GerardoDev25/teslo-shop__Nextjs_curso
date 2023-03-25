import { NextPage } from 'next';
import { AdminLayout } from '@/components/layout';
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
import { SummaryTile } from '@/components/admin';
import { Grid } from '@mui/material';

const DashboarPage: NextPage = () => {
  return (
    <AdminLayout
      title='Dashboard'
      suTitle='estadisticas generales'
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={1}
          subTitle='Ordenes Totales'
          icon={
            <CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }} />
          }
        />

        <SummaryTile
          title={2}
          subTitle='Ordenes Pagadas'
          icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={3}
          subTitle='Ordenes pendientes'
          icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={4}
          subTitle='Clientes'
          icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={5}
          subTitle='Productos'
          icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={6}
          subTitle='Sin existencias'
          icon={
            <CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />
          }
        />

        <SummaryTile
          title={7}
          subTitle='Sin inventario'
          icon={
            <ProductionQuantityLimitsOutlined
              color='warning'
              sx={{ fontSize: 40 }}
            />
          }
        />

        <SummaryTile
          title={8}
          subTitle='Actualizacion en'
          icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};
export default DashboarPage;