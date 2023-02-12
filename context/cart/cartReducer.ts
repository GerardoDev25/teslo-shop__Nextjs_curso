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

    case '[Cart] - Add Product':
      const product = state.cart.find(
        ({ _id, size }) =>
          _id == action.payload._id && size === action.payload.size
      );

      return product
        ? {
            ...state,
            cart: state.cart.map((prod) => {
              if (
                prod._id == action.payload._id &&
                prod.size === action.payload.size
              ) {
                return {
                  ...prod,
                  quantity: prod.quantity + action.payload.quantity,
                };
              }

              return prod;
            }),
          }
        : { ...state, cart: [...state.cart, action.payload] };

    default:
      return state;
  }
};
