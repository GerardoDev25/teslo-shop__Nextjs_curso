import { IUser } from '@/interfaces';
import { createContext } from 'react';

export interface ContextPropsAuth {
  isLoggeIn: boolean;
  user?: IUser;

  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{
    hasError: boolean;
    message?: string;
  }>;
}

export const AuthContext = createContext({} as ContextPropsAuth);
