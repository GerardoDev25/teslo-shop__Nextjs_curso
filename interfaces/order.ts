import { ISize } from './products';
import { IUser } from './user';

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItems[];
  shippingAddress: ShippingAddress;
  // paymentResult: string;

  numberOfItem: number;
  subTotal: number;
  tax: number;
  total: number;

  isPaid: boolean;
  paidAt?: string;

  transactionId?: string;
}

export interface ShippingAddress {
  address: string;
  address2?: string;
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  phone: string;
  zip: string;
}

export interface IOrderItems {
  _id: string;
  gender: string;
  images: string;
  price: number;
  quantity: number;
  size: ISize;
  slug: string;
  title: string;
}
