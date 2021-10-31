import { UserRoles } from '@/enums';

export interface IUserLoginRequest {
  email: string,
  password: string
};

export interface IUserLoginResponse {
  userId: string,
  token: string,
};

export interface IUser {
  _id: string,
  firstName: string,
  secondName: string,
  email: string,
  img?: string,
  cart: string,
  role: UserRoles
};
