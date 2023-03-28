import { db } from '@/database';
import { IUser } from '@/interfaces';
import { UserModel } from '@/models';
import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

type Data =
  | {
      message: string;
    }
  | IUser[];

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
    case 'GET':
      return getUsers(req, res);

    case 'POST':
      return updateUsers(req, res);

    default:
      res.status(400).json({ message: 'bad request' });
      break;
  }
}
const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const users = await UserModel.find().select('-password').lean();
  await db.disconnect();

  return res.status(200).json(users);
};

const updateUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = '', role = '' } = req.body;

  const listRoles = ['admin', 'super-user', 'client'];

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: 'no existe usuario con ese id' });
  }

  if (!listRoles.includes(role)) {
    return res.status(401).json({
      message: 'role no permitido',
    });
  }
  await db.connect();

  const user = await UserModel.findById(userId);
  if (!user) {
    await db.disconnect();
    return res.status(404).json({ message: 'usuario no encontrado' });
  }

  user.role = role;
  await user.save();
  await db.disconnect();

  return res.status(200).json({ message: 'usuario actualizado' });
};
