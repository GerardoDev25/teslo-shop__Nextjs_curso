import { IOrder } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      message: string;
    }
  | IOrder;

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);

    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}
const createOrder = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const body = req.body as IOrder;

  res.status(201).json(body);
};
