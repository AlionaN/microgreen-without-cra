import {
  put,
  all,
  call,
  takeLatest
} from 'redux-saga/effects';
import * as types from '@/store/actionTypes';
import * as api from '@/api';
import * as actions from '@/store/actions';

interface IGetUserStatistics {
  type: typeof types.GET_USERS_STATISTICS,
  dateStart?: string,
  dateEnd?: string,
  periodValue?: string,
};

interface IGetProductStatistics {
  type: typeof types.GET_PRODUCTS_STATISTICS,
  dateStart?: string,
  dateEnd?: string,
  categoryId?: string,
  periodValue?: string,
};

export function* getUserStatistics({ type, dateStart, dateEnd, periodValue }: IGetUserStatistics) {
  try {
    const response: Promise<Response> = yield call(api.getUserStatistics, dateStart, dateEnd, periodValue);

    yield put(actions.getUserStatisticsSuccess(response));    
  } catch (error) {
    yield put(actions.getUserStatisticsFailure());
  };
};

export function* getProductStatistics({ type, dateStart, dateEnd, categoryId, periodValue }: IGetProductStatistics) {
  try {
    const response: Promise<Response> = yield call(api.getProductStatistics, dateStart, dateEnd, categoryId, periodValue);

    yield put(actions.getProductStatisticsSuccess(response));
  } catch (error) {
    yield put(actions.getProductStatisticsFailure());
  };
};

export default function* watch() {
  yield all([
    takeLatest(types.GET_PRODUCTS_STATISTICS, getProductStatistics),
    takeLatest(types.GET_USERS_STATISTICS, getUserStatistics),
  ]);
};
