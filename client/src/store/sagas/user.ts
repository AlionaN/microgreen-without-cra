import {
  put,
  call,
  takeEvery,
  all
} from 'redux-saga/effects';
import * as types from '@/store/actionTypes';
import * as api from '@/api';
import * as actions from '@/store/actions';

interface UserAction extends Action, IUser {type: types.REGISTER};

export function* register({ payload }): Generator {
  try {
    const response = yield call(api.register, payload);
    yield put(actions.registerSuccess(payload));
    yield put(actions.getUser());
  } catch (error) {
    yield put(actions.registerFailure(error.response.data));
  }
}

export default function* watch() {
  yield all([
    takeEvery<>(types.REGISTER, register),
  ]);
}
