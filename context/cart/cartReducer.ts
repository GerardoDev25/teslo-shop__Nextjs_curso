import { ICartProduct } from '@/interfaces';
import { CartState } from './';

type CartActionType =
  | {
      type: '[Cart] - LoadCart from cokies | storage';
      payload: ICartProduct[];
    }
  | {
      type: '[Cart] - Update products in cart';
      payload: ICartProduct[];
    }
  | {
      type: '[Cart] - Change cart Quantity';
      payload: ICartProduct;
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case '[Cart] - LoadCart from cokies | storage':
      return { ...state, cart: [...action.payload] };

    case '[Cart] - Update products in cart':
      return { ...state, cart: [...action.payload] };

    case '[Cart] - Change cart Quantity':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          return action.payload;
        }),
      };

    default:
      return state;
  }
};
