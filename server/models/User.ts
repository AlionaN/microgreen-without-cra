import { Schema, model, Types } from 'mongoose';
import { IProduct } from './Product';

interface IUser {
  firstName: string,
  secondName: string,
  email: string,
  img: string,
  password: string,
  password_confirm: string,
  isSignIn: boolean,
  cart: IProduct[],
  favourites: IProduct[],
}

const schema = new Schema<IUser>({
  firstName: {  type: String, required: true },
  secondName: {  type: String, required: true },
  email: {  type: String, required: true,  unique: true },
  img: {  type: String, required: true },
  password: {  type: String, required: true },
  password_confirm: {  type: String, required: true },
  isSignIn: {  type: Boolean, required: true },
  cart: [{ type: Types.ObjectId, ref: 'Product' }],
  favourites: [{ type: Types.ObjectId, ref: 'Product' }]
});

const UserModel = model<IUser>('User', schema);

export default UserModel;
