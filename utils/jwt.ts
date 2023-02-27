import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('no hay semilla de jwt');
  }

  return jwt.sign({ _id, email }, process.env.JWT_SECRET_SEED, {
    expiresIn: '30d',
  });
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) throw new Error('no hay semilla de jwt');

  if (token.length <= 10) return Promise.reject('JWT no es valido');

  return new Promise((res, rej) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if (err) return rej('JWT no es valido');
        const { _id } = payload as { _id: string };
        res(_id);
      });
    } catch {
      rej('JWT no es valido');
    }
  });
};
