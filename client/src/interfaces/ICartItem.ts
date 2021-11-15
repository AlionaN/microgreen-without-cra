import { IProductFromDB } from '.';

export interface ICart {
  _id: string,
  items: ICartItem[],
  totalQuantity: number,
  totalPrice: number,
  createdAt: string,
  updatedAt: string,
  __v: number
};

export interface ICartItem {
  product: IProductFromDB,
  itemPrice: number,
  quantity: number,
  _id: string
};

export interface IGuestCart {
  items: ICartItem[],
  totalQuantity: number,
  totalPrice: number
};
