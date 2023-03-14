import { IOrder } from '@/interfaces';
import { OrderModel } from '@/models';
import { isValidObjectId } from 'mongoose';
import { db } from '.';

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  await db.connect();
  const order = await OrderModel.findById(id).lean();
  await db.disconnect();

  return order ? JSON.parse(JSON.stringify(order)) : null;
};
