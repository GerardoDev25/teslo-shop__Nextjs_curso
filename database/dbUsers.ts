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

export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();

  const user = await UserModel.findOne({ email: oAuthEmail }).lean();
  if (user) {
    await db.disconnect();
    const { _id, name, email, role } = user;
    return { id: _id, name, email, role };
  }

  const newUser = new UserModel({
    email: oAuthEmail,
    name: oAuthName,
    password: '@',
    role: 'client',
  });
  await newUser.save();
  await db.disconnect();

  const { _id, name, role, email } = newUser;
  return { id: _id, name, role, email };
};
