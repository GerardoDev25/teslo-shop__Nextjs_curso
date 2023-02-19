import { tesloApi } from '@/api';
import { IUser } from '@/interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useReducer } from 'react';
import { AuthContext, authReducer } from './';

export interface AuthState {
  isLoggeIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggeIn: false,
  user: undefined,
};

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });

      const { token, user } = data;
      Cookies.set('token', token);

      dispatch({ type: '[Auth] - Login', payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{
    hasError: boolean;
    message?: string;
  }> => {
    try {
      const { data } = await tesloApi.post('/user/register', {
        name,
        email,
        password,
      });

      const { token, user } = data;
      Cookies.set('token', token);

      dispatch({ type: '[Auth] - Login', payload: user });
      // todo return
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: 'No se pudo crear el usuario',
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        loginUser,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
