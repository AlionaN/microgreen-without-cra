import { Schema, model, Types } from 'mongoose';

export interface IProduct {
  categoryId: typeof Types.ObjectId,
  title: string,
  description: string,
  amount?: number,
  size?: number,
  image: string,
  price: number
}

const schema = new Schema<IProduct>({
  categoryId: { type: Types.ObjectId, ref: 'Category' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: false },
  size: { type: Number, required: false },
  image: { type: String, required: false },
  price: { type: Number, required: true }
});

const ProductModel = model<IProduct>('Product', schema)

export default ProductModel;
