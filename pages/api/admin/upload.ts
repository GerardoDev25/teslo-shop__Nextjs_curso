import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import formidable from 'formidable';
import { db } from '@/database';

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session: any = await getSession({ req });

  if (!session)
    return res.status(401).json({
      message: 'Debe de estar autorizado para acceder a este recurso',
    });

  const validRoles = ['admin', 'super-user'];

  if (!validRoles.includes(session.user.role)) {
    return res.status(401).json({
      message: 'Debe de estar autorizado para acceder a este recurso',
    });
  }

  switch (req.method) {
    case 'POST':
      return uploadFile(req, res);

    default:
      return res.status(400).json({ message: 'bad request' });
  }
}
const parseFile = async (req: NextApiRequest) => {};

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await parseFile(req);

  return res.status(200).json({ message: 'imagen subida' });
};
