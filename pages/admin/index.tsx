import { NextPage } from 'next';
import { AdminLayout } from '@/components/layout';
import { DashboardOutlined } from '@mui/icons-material';

const DashboarPage: NextPage = () => {
  return (
    <AdminLayout
      title='Dashboard'
      suTitle='estadisticas generales'
      icon={<DashboardOutlined />}
    >
      <h1>hola</h1>
    </AdminLayout>
  );
};
export default DashboarPage