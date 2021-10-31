import { all, fork } from 'redux-saga/effects';

import categorySaga from '@/store/sagas/category';
import productSaga from '@/store/sagas/product';
import userSaga from '@/store/sagas/user';
import cartSaga from '@/store/sagas/cart';

export function* rootSaga() {
  yield all([fork(categorySaga), fork(productSaga), fork(userSaga), fork(cartSaga)]);
}
