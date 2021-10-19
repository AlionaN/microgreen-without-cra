import { IStatus, IUserLoginResponse } from '@/interfaces';
import * as types from '@/store/actionTypes/user';
import { AnyAction, Reducer } from 'redux';
import * as helpers from '../helpers';

interface IInitialState {
  user: IUserLoginResponse["user"] | null,
  isLogIn: boolean,
  registerStatus: IStatus,
  loginStatus: IStatus
};

const initialState: IInitialState = {
  user: null,
  isLogIn: false,
  registerStatus: helpers.getDefaultState(),
  loginStatus: helpers.getDefaultState(),
};

export const userReducer: Reducer = (state = initialState, action: AnyAction) => {

  switch(action.type) {
    case types.REGISTER:
      return {
        ...state,
        registerStatus: helpers.getRequestState()
      };
    
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        registerStatus: helpers.getSuccessState('You are successfully registered'),
        isLogIn: true
      };

    case types.REGISTER_FAILURE:
      return {
        ...state,
        registerStatus: helpers.getErrorState('Something went wrong. Try again.')
      };

    case types.CLEAR_REGISTER_STATUS:
      return {
        ...state,
        registerStatus: helpers.getDefaultState()
      };

    case types.LOGIN:
      return {
        ...state,
        loginStatus: helpers.getRequestState()
      };
    
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loginStatus: helpers.getSuccessState('You are successfully login'),
        isLogIn: true,
      };

    case types.LOGIN_FAILURE:
      return {
        ...state,
        loginStatus: helpers.getErrorState('Something went wrong. Try again')
      };

    case types.CLEAR_LOGIN_STATUS:
      return {
        ...state,
        loginStatus: helpers.getDefaultState(),
      };
      
    case types.LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        logoutStatus: helpers.getRequestState(),
        isLogIn: false
      };

    default:
      return state;
  };
};
