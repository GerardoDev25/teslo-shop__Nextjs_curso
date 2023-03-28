import { AdminLayout } from '@/components/layout';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import React from 'react';

const OrdersPage = () => {
  return (
    <AdminLayout
      title={'Ordenes'}
      suTitle={'mantenimiento de ordenes'}
      icon={<ConfirmationNumberOutlined />}
    >
      orders
    </AdminLayout>
  );
};
export default OrdersPage;
