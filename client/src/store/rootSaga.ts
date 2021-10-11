import { all, fork } from 'redux-saga/effects';

import categorySaga from '@/store/sagas/category';
import productSaga from '@/store/sagas/product';

export function* rootSaga() {
  yield all([fork(categorySaga), fork(productSaga)]);
}
