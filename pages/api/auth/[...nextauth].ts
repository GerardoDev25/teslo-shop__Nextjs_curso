import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from '@/database';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'custom login',
      credentials: {
        email: {
          label: 'Correo',
          type: 'email',
          placeholder: 'tu correo',
        },
        password: {
          label: 'Contraseña',
          type: 'password',
          placeholder: 'tu Contraseña',
        },
      },

      async authorize(credentials, req) {
        return await dbUsers.checkUserEmailAndPassword(
          credentials?.email,
          credentials?.password
        );
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],

  // callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(
              user?.email || '',
              user?.name || ''
            );
            break;

          case 'credentials':
            token.user = user;
            break;

          default:
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      // session.accessToken = token.accessToken;
      // session.user = token.user as any;

      return {
        ...session,
        accessToken: token.accessToken,
        user: token.user as any,
      };
    },
  },
};

export default NextAuth(authOptions);
