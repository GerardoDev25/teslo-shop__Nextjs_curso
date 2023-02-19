import { IUser } from '@/interfaces';
import { createContext } from 'react';

export interface ContextPropsAuth {
  isLoggeIn: boolean;
  user?: IUser;
}

export const AuthContext = createContext({} as ContextPropsAuth);
