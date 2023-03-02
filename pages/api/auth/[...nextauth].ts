import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'custom login',
      credentials: {
        email: { label: 'Correo', type: 'email', placeholder: 'tu correo' },
        password: {
          label: 'Contraseña',
          type: 'password',
          placeholder: 'tu Contraseña',
        },
      },
      async authorize(credentials) {
        console.log(credentials);

        // return null;
        // todo verificar contra db
        return { ...credentials, role: 'admin', id: '123' };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],

  jwt: {},
  // callbacks
  callbacks: {},
};

export default NextAuth(authOptions);
