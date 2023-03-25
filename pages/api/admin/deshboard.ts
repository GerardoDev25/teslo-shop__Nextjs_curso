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

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  
  
  // res.status(200).json({ message: 'Example' });
}
