import { IProductFromDB } from '.';
import { UserRoles } from '@/enums';


export interface IUserLoginRequest {
  email: string,
  password: string
};

export interface IUserLoginResponse {
  token: string,
  user: {
    _id: string,
    firstName: string,
    secondName: string,
    email: string,
    img?: string,
    cart?: IProductFromDB[],
    favourites?: IProductFromDB[],
    role: UserRoles
  }
};
