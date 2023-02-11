import { ICartProduct } from '@/interfaces';
import { CartState } from './';

type CartActionType =
  | {
      type: '[Cart] - LoadCart from cokies | storage';
      payload: ICartProduct[];
    }
  | {
      type: '[Cart] - Add Product';
      payload: ICartProduct;
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case '[Cart] - LoadCart from cokies | storage':
      return { ...state };

    default:
      return state;
  }
};
