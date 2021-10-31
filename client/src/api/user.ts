import { IUserLoginRequest, IUserRegisterRequest } from '@/interfaces';
import { apiURL } from './apiConfig';

export const register = async (user: IUserRegisterRequest) => {
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
  let result;
  if (response.ok) {
    result  = await response.json();
  } else {
    throw new Error('User not found');
  }
  return result;
};

export const getUser = async (userId: string) => {
  const response = await fetch(`${apiURL}/user/${userId}`);
  let result;
  if (response.ok) {
    result  = await response.json();
  } else {
    throw new Error('User not found');
  }
  return result;
};
