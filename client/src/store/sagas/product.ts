import {
  put,
  call,
  takeEvery,
  all
} from 'redux-saga/effects';
import * as api from '@/api';
import * as actions from '@/store/actions';
import * as types from '@/store/actionTypes';
import { IProduct, IProductFilters } from '@/interfaces';

interface IGetProducts {
  type: typeof types.GET_PRODUCTS, 
  filters: IProductFilters,
  sorting: string
}

interface IPostProduct {
  type: typeof types.POST_PRODUCT, 
  payload: IProduct
}

interface IDeleteProduct {
  type: typeof types.DELETE_PRODUCT, 
  payload: string
}

interface IEditProduct {
  type: typeof types.EDIT_PRODUCT, 
  id: string, 
  payload: IProduct
}

export function* getProducts({ type, filters, sorting }: IGetProducts) {
  try {
    const response: Response = yield api.getProducts(filters, sorting);
    yield put(actions.clearGetProductsStatus());
    yield put(actions.getProductsSuccess(response));
  } catch (error) {
    yield put(actions.getProductsFailure());
  }
}

export function* postProduct({ type, payload }: IPostProduct) {
  try {
    yield api.postProduct(payload);

    yield put(actions.postProductSuccess(payload));
    yield put(actions.clearPostProductStatus());
    yield put(actions.getProducts());
  } catch (error) {
    yield put(actions.postProductFailure());
  }
}

export function* deleteProduct({type, payload }: IDeleteProduct) {
  try {
    yield api.deleteProduct(payload);

    yield put(actions.deleteProductSuccess());
    yield put(actions.clearDeleteProductStatus());
    yield put(actions.getProducts());
  } catch (error) {
    yield put(actions.deleteProductFailure());
  }
}

export function* editProduct({type, id, payload }: IEditProduct) {
  try {
    const response: IProduct = yield api.editProduct(id, payload);

    yield put(actions.editProductSuccess(response));
    yield put(actions.clearEditProductStatus());
    yield put(actions.getProducts());
  } catch (error) {
    yield put(actions.editProductFailure());
  }
}

export default function* productSaga() {
  yield all([
    takeEvery(types.GET_PRODUCTS, getProducts),
    takeEvery(types.POST_PRODUCT, postProduct),
    takeEvery(types.DELETE_PRODUCT, deleteProduct),
    takeEvery(types.EDIT_PRODUCT, editProduct),
  ]);
}
