import { Schema, model, Types } from 'mongoose';
import { IProduct } from '../models/Product';

export interface ICart {
  items: {
    product: IProduct,
    itemPrice: number,
    quantity: number
  }[],
  totalQuantity: number,
  totalPrice: number,
};

const schema = new Schema<ICart>({
  items: [{
    product: { type: Object, required: true },
    itemPrice: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  totalQuantity: Number,
  totalPrice: Number,
}, { timestamps: true });

const CartModel = model<ICart>('Cart', schema);

export default CartModel;
