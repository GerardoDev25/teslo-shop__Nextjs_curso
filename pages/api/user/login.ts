import type { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import { db } from '@/database';
import { UserModel } from '@/models';

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
      return loginUser(req, res);

    default:
      return res.status(400).json({ message: 'bad Request' });
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '' } = req.body;

  await db.connect();

  const user = await UserModel.findOne({ email });

  await db.disconnect();
  if (!user)
    return res.status(400).json({ message: 'email o contraseña no valido' });

  if (!bcryptjs.compareSync(password, user.password!))
    return res.status(400).json({ message: 'email o contraseña no valido' });

  const { role, name } = user;

  return res.status(200).json({
    token: '',
    user: { email, role, name },
  });
};
