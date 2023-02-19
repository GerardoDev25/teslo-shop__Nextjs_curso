import { createContext } from 'react';
import { ICartProduct } from '@/interfaces';

export interface ContextPropsCart {
  cart: ICartProduct[];
  numberOfItem: number;
  subTotal: number;
  tax: number;
  total: number;

  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextPropsCart);
