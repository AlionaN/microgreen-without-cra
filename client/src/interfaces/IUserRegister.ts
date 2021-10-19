export interface IUserRegisterRequest {
  firstName: string,
  secondName: string,
  email?: string,
  img: string,
  password: string,
  password_confirm: string,
};

export interface IUserRegisterResponse {
  userId: string,
};
