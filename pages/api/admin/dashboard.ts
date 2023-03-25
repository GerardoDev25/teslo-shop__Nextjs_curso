import { db } from '@/database';
import { OrderModel, ProductModel, UserModel } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  numberOfOrders: number;
  paidOrders: number;
  notPaidOrders: number;
  numberOfClients: number;
  numberOfProducts: number;
  productswithNoInventory: number;
  lowInventory: number;
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();

  // const numberOfOrders = await OrderModel.count();
  // const paidOrders = await OrderModel.find({ isPaid: true }).count();
  // const numberOfClients = await UserModel.find({ role: 'client' }).count();
  // const numberOfProducts = await ProductModel.count();
  // const lowInventory = await ProductModel.find({
  //   inStock: { $lte: 10 },
  // }).count();
  // const productswithNoInventory = await ProductModel.find({
  //   inStock: 0,
  // }).count();

  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    lowInventory,
    productswithNoInventory,
  ] = await Promise.all([
    OrderModel.count(),
    OrderModel.find({ isPaid: true }).count(),
    UserModel.find({ role: 'client' }).count(),
    ProductModel.count(),
    ProductModel.find({
      inStock: { $lte: 10 },
    }).count(),
    ProductModel.find({
      inStock: 0,
    }).count(),
  ]);

  await db.disconnect();

  res.status(200).json({
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    lowInventory,
    productswithNoInventory,
    notPaidOrders: numberOfOrders - paidOrders,
  });
}
