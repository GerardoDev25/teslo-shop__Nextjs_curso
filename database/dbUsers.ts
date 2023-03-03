import bcryptjs from 'bcryptjs';
import { UserModel } from '@/models';
import { db } from '.';

export const checkUserEmailAndPassword = async (
  email: string = '',
  password: string = ''
) => {
  await db.connect();
  const user = await UserModel.findOne({ email }).lean();
  await db.disconnect();

  if (!user) return null;
  if (!bcryptjs.compareSync(password, user.password!)) return null;

  const { role, name, _id } = user;

  return { role, name, id: _id, email: email.toLowerCase() };
};
