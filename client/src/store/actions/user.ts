import * as types from '../actionTypes/user';
import { IUser } from '@/interfaces';

export const register = (payload: IUser) => ({ 
  type: types.REGISTER,
  payload
});

export const registerSuccess = (payload: IUser) => ({ 
  type: types.REGISTER_SUCCESS,
  payload
});

export const registerFailure = (payload: Error) => ({ 
  type: types.REGISTER_FAILURE,
  payload
});

export const clearRegisterStatus = () => ({ 
  type: types.CLEAR_REGISTER_STATUS,
});
