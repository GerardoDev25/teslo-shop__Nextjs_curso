import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(404).json({ message: 'debe expecificar el query de busqueda' });
}
