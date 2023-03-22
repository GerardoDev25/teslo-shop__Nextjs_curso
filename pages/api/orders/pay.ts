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
      return payOrder(req, res);
      break;

    default:
      return res.status(400).json({ message: 'bad request' });
  }
}
const payOrder = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  return res.status(200).json({ message: 'orden pagada' });
};
