import { useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';

import Cookies from 'js-cookie';
import { tesloApi } from '@/api';
import { IUser } from '@/interfaces';
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
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      console.log(data.user);
      dispatch({ type: '[Auth] - Login', payload: data.user as IUser });
    }
  }, [data?.user, status]);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  const checkToken = async () => {
    if (!Cookies.get('token')) return;

    try {
      const { data } = await tesloApi.get('/user/validate-token');

      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
    } catch (error) {
      Cookies.remove('token');
    }
  };

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

  const logout = () => {
    Cookies.remove('cart');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('phone');
    Cookies.remove('zip');

    signOut();
    // router.push('/');
    // Cookies.remove('token');
    // router.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
