import { Schema, model, Types } from 'mongoose';
import { IProduct } from './Product';

enum UserRoles {
  admin = 'ADMIN',
  user = 'USER'
};

interface IUser {
  firstName: string,
  secondName: string,
  email: string,
  img?: string,
  password: string,
  password_confirm: string,
  cart: IProduct[],
  favourites: IProduct[],
  role: UserRoles,
};

const schema = new Schema<IUser>({
  firstName: {  type: String, required: true },
  secondName: {  type: String, required: true },
  email: {  type: String, required: true,  unique: true },
  img: {  type: String, required: false },
  password: {  type: String, required: true },
  password_confirm: {  type: String, required: true },
  cart: [{ type: Types.ObjectId, ref: 'Product' }],
  favourites: [{ type: Types.ObjectId, ref: 'Product' }],
  role: [{ type: String, required: true }]
});

const UserModel = model<IUser>('User', schema);

export default UserModel;
