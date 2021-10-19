import {
  put,
  takeEvery,
  all
} from 'redux-saga/effects';
import * as types from '@/store/actionTypes';
import * as api from '@/api';
import * as actions from '@/store/actions';
import { IUserLoginRequest, IUserRegisterRequest, IUserLoginResponse } from '@/interfaces';

interface IRegister {
  type: typeof types.REGISTER,
  payload: IUserRegisterRequest
};

interface ILogin {
  type: typeof types.LOGIN,
  payload: IUserLoginRequest,
};

interface ILogout {
  type: typeof types.LOGOUT
};

export function* register({ type, payload }: IRegister) {
  try {
    yield api.register(payload);
    const { email = '', password } = payload;

    yield put(actions.registerSuccess());
    yield api.login({ email, password });
    yield put(actions.loginSuccess());
  } catch (error) {
    yield put(actions.registerFailure());
  }
}

export function* login({ type, payload }: ILogin) {
  try {
    const response: IUserLoginResponse = yield api.login(payload);
    const { user, token } = response;
    user && localStorage.setItem('token', token);
    token && localStorage.setItem('user', JSON.stringify(user));
    yield put(actions.loginSuccess());
  } catch (error) {
    yield put(actions.loginFailure());
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.REGISTER, register),
    takeEvery(types.LOGIN, login),
  ]);
}
