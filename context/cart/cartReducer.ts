import { ICartProduct } from '@/interfaces';
import { CartState, ShippingAddress } from './';

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
    }
  | {
      type: '[Cart] - Remove Prduct in Cart';
      payload: ICartProduct;
    }
  | {
      type: '[Cart] - Load Adress from Cookies';
      payload: ShippingAddress;
    }
  | {
      type: '[Cart] - Update order summary';
      payload: {
        numberOfItem: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case '[Cart] - LoadCart from cokies | storage':
      return { ...state, isLoaded: true, cart: [...action.payload] };

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

    case '[Cart] - Remove Prduct in Cart':
      const { _id, size } = action.payload;

      return {
        ...state,
        cart: state.cart.filter(
          (product) => !(product._id === _id && product.size === size)
        ),
      };

    case '[Cart] - Update order summary':
      return { ...state, ...action.payload };

    case '[Cart] - Load Adress from Cookies':
      return { ...state, shippingAddress: action.payload };

    default:
      return state;
  }
};
