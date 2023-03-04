import { useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { ICartProduct, ShippingAddress } from '@/interfaces';
import { CartContext, cartReducer } from './';
import { tesloApi } from '@/api';

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItem: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItem: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};

interface Props {
  children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  // Efecto
  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart')
        ? JSON.parse(Cookie.get('cart')!)
        : [];
      dispatch({
        type: '[Cart] - LoadCart from cokies | storage',
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: '[Cart] - LoadCart from cokies | storage',
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Cookie.set('cart', JSON.stringify(state.cart));
    }, 0);
  }, [state.cart]);

  useEffect(() => {
    const numberOfItem = state.cart.reduce(
      (prev, curr) => curr.quantity + prev,
      0
    );

    const subTotal = state.cart.reduce(
      (prev, curr) => curr.quantity * curr.price + prev,
      0
    );

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItem,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal + taxRate + 1,
    };

    dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
  }, [state.cart]);

  useEffect(() => {
    if (!Cookie.get('firstName')) return;

    const shippingAddress = {
      address: Cookie.get('address') || '',
      address2: Cookie.get('address2') || '',
      city: Cookie.get('city') || '',
      country: Cookie.get('country') || '',
      firstName: Cookie.get('firstName') || '',
      lastName: Cookie.get('lastName') || '',
      phone: Cookie.get('phone') || '',
      zip: Cookie.get('zip') || '',
    };

    dispatch({
      type: '[Cart] - Load Adress from Cookies',
      payload: shippingAddress,
    });
  }, []);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart)
      return dispatch({
        type: '[Cart] - Update products in cart',
        payload: [...state.cart, product],
      });

    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCartButDifferentSize)
      return dispatch({
        type: '[Cart] - Update products in cart',
        payload: [...state.cart, product],
      });

    // Acumular
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // Actualizar la cantidad
      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: '[Cart] - Update products in cart',
      payload: updatedProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Change cart Quantity', payload: product });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Remove Prduct in Cart', payload: product });
  };

  const updateAdress = (address: ShippingAddress) => {
    Cookie.set('address', address.address);
    Cookie.set('address2', address.address2 || '');
    Cookie.set('city', address.city);
    Cookie.set('country', address.country);
    Cookie.set('firstName', address.firstName);
    Cookie.set('lastName', address.lastName);
    Cookie.set('phone', address.phone);
    Cookie.set('zip', address.zip);

    dispatch({ type: '[Cart] - Update Address', payload: address });
  };

  const createOrder = async () => {
    try {
      const { data } = await tesloApi.post('/orders', {});

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAdress,

        // orders
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
