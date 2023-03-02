import { createContext } from 'react';
import { ICartProduct } from '@/interfaces';
import { ShippingAddress } from './CartProvider';

export interface ContextPropsCart {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItem: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress;

  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextPropsCart);
