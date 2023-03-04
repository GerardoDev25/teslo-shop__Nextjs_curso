import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);

    default:
      res.status(400).json({ message: 'Bad Request' });
      break;
  }
}
const createOrder = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(201).json({ message: 'done' });
};
