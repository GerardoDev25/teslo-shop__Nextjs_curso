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
    case 'GET':
      return checkJWT(req, res);

    default:
      return res.status(400).json({ message: 'bad Request' });
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies as { token: string };

  try {
    const userId = await jwt.isValidToken(token);

    await db.connect();
    const user = await UserModel.findById(userId).lean();
    await db.disconnect();

    if (!user)
      return res.status(404).json({ message: 'usuario no encontrado' });

    const { role, name, email } = user;

    return res.status(200).json({
      user: { email, role, name },
      token: jwt.signToken(userId, email),
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'token no valido' });
  }
};
