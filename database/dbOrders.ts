import { isValidObjectId } from 'mongoose';

import { IOrder } from '@/interfaces';
import { OrderModel } from '@/models';
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

export const getOrderByUser = async (userId: string): Promise<IOrder[]> => {
  if (!isValidObjectId(userId)) {
    return [];
  }

  await db.connect();
  const orders = await OrderModel.find({ user: userId }).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(orders));
};
