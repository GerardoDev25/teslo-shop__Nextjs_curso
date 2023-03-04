import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '@/interfaces';

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
  updateAdress: (address: ShippingAddress) => void;
  createOrder: () => Promise<void>;
}

export const CartContext = createContext({} as ContextPropsCart);
