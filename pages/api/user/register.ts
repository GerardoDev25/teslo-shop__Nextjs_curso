import type { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';

import { db } from '@/database';
import { UserModel } from '@/models';
import { jwt } from '@/utils';

type Data =
  | { message: string }
  | {
      token: string;
      user: { email: string; role: string; name: string };
    };

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res);

    default:
      return res.status(400).json({ message: 'bad Request' });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = '',
    password = '',
    name = '',
  } = req.body as { email: string; password: string; name: string };

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'la contraseña es muy corta minimo 6 cararcteres' });
  }

  if (name.length < 2) {
    return res
      .status(400)
      .json({ message: 'el nombre es muy corta minimo 3 cararcteres' });
  }

  // todo validar email

  await db.connect();
  const user = await UserModel.findOne({ email });

  if (user) {
    await db.disconnect();
    return res.status(400).json({ message: 'email registrado o no valido' });
  }

  const newUser = new UserModel({
    email: email.toLowerCase,
    password: bcryptjs.hashSync(password),
    name,
    role: 'client',
  });

  try {
    await newUser.save({ validateBeforeSave: true });
    await db.disconnect();
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({ message: 'revisar logs del servidor' });
  }

  const { _id, role } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    user: { email, role, name },
    token,
  });
};
