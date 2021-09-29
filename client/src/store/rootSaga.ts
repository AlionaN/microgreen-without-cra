import { all, fork } from 'redux-saga/effects';

import categorySaga from '@/store/sagas/category';

export function* rootSaga() {
  yield all([fork(categorySaga)]);
}
