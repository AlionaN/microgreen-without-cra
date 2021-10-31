import * as types from '../actionTypes/user';
import { IUserLoginResponse, IUserLoginRequest, IUserRegisterRequest, IUser } from '@/interfaces';

export const register = (payload: IUserRegisterRequest) => ({ 
  type: types.REGISTER,
  payload
});

export const registerSuccess = () => ({ 
  type: types.REGISTER_SUCCESS,
});

export const registerFailure = () => ({ 
  type: types.REGISTER_FAILURE,
});

export const clearRegisterStatus = () => ({ 
  type: types.CLEAR_REGISTER_STATUS,
});

export const login = (payload: IUserLoginRequest) => ({ 
  type: types.LOGIN,
  payload
});

export const loginSuccess = () => ({ 
  type: types.LOGIN_SUCCESS,
});

export const loginFailure = () => ({ 
  type: types.LOGIN_FAILURE,
});

export const clearLoginStatus = () => ({ 
  type: types.CLEAR_LOGIN_STATUS,
});

export const logout = () => ({ 
  type: types.LOGOUT,
});

export const getUser = (userId: string) => ({
  type: types.GET_USER,
  userId
});

export const getUserSuccess = (payload: IUser) => ({
  type: types.GET_USER_SUCCESS,
  payload
});

export const getUserFailure = () => ({
  type: types.GET_USER_FAILURE
});

export const clearGetUserStatus = () => ({
  type: types.CLEAR_GET_USER_STATUS
});
