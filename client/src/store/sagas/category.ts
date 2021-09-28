import {
  put,
  call,
  takeEvery,
  all
} from 'redux-saga/effects';
import * as api from '@/api';
import * as actions from '@/store/actions';
import * as types from '@/store/actionTypes';
import { ICategory } from '@/interfaces';

export function* getCategories() {
  try {
    const response: ICategory[] = yield call(api.getCategories);

    yield put(actions.getCategoriesSuccess(response));
  } catch (error) {
    yield put(actions.getCategoriesFailure(error));
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.GET_CATEGORIES, getCategories),
  ]);
}
