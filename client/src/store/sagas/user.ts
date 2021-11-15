import {
  put,
  all,
  call,
  takeLatest
} from 'redux-saga/effects';
import * as types from '@/store/actionTypes';
import * as api from '@/api';
import * as actions from '@/store/actions';
import { IUserLoginRequest, IUserRegisterRequest, IUserLoginResponse, IUser } from '@/interfaces';

interface IRegister {
  type: typeof types.REGISTER,
  payload: IUserRegisterRequest
};

interface ILogin {
  type: typeof types.LOGIN,
  payload: IUserLoginRequest,
};

interface IGetUser {
  type: typeof types.GET_USER,
  userId: string
}

export function* register({ type, payload }: IRegister) {
  try {
    yield call(api.register, payload);
    const { email = '', password } = payload;

    yield put(actions.registerSuccess());
    const response: IUserLoginResponse = yield call(api.login, { email, password });
    yield put(actions.loginSuccess());
    yield put(actions.getUser(response.userId));
  } catch (error) {
    yield put(actions.registerFailure());
  }
}

export function* login({ type, payload }: ILogin) {
  try {
    const response: IUserLoginResponse = yield call(api.login, payload);
    yield put(actions.loginSuccess());
    
    const { token, userId } = response;
    token && localStorage.setItem('token', token);
    userId && localStorage.setItem('userId', userId);
  } catch (error) {
    yield put(actions.loginFailure());
  }
}

export function* getUser({ type, userId }: IGetUser) {
  try {
    const response: IUser = yield call(api.getUser, userId);
    yield put(actions.getUserSuccess(response));
    yield put(actions.getCart(response.cart));
    localStorage.setItem('role', response.role[0]);
    
  } catch (error) {
    yield put(actions.getUserFailure());
  }
}

export default function* watch() {
  yield all([
    takeLatest(types.REGISTER, register),
    takeLatest(types.LOGIN, login),
    takeLatest(types.GET_USER, getUser),
  ]);
}
