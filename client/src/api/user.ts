import { IUserLoginRequest, IUserRegisterRequest } from '@/interfaces';
import { apiURL } from './apiConfig';

export const register = async (user: IUserRegisterRequest) => {
  console.log(user);
  const response = await fetch(`${apiURL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  });

  const result = await response.json();

  return result;
};

export const login = async (user: IUserLoginRequest) => {
  const response = await fetch(`${apiURL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  });

  const result = await response.json();
  console.log(result);

  return result;
};
