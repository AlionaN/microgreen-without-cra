import {
  put,
  takeEvery,
  all,
  call
} from 'redux-saga/effects';
import * as types from '@/store/actionTypes';
import * as api from '@/api';
import * as actions from '@/store/actions';
import { Response } from 'express';

interface IGetCart {
  type: typeof types.GET_CART,
  cartId: string
};

interface IUpdateCart {
  type: typeof types.ADD_PRODUCT_TO_CART | typeof types.UPDATE_PRODUCT_IN_CART,
  cartId: string,
  productId: string,
  quantity: number
};

interface IClearCart {
  type: typeof types.CLEAR_CART,
  cartId: string
};

interface IDeleteProductFromCart {
  type: typeof types.DELETE_PRODUCT_FROM_CART,
  cartId: string,
  productId: string,
}

export function* getCart({ type, cartId }: IGetCart) {
  try {
    const response: Response = yield call(api.getCart, cartId);
    
    yield put(actions.getCartSuccess(response));
  } catch (error) {
    yield put(actions.getCartFailure());
  }
}

export function* addProductToCart({ type, cartId, productId, quantity }: IUpdateCart) {
  try {
    const response: Response = yield call(api.addProductToCart, cartId, productId, quantity);
    yield put(actions.addProductToCartSuccess(response));
    yield put(actions.getCart(cartId));
  } catch (error) {
    yield put(actions.addProductToCartFailure());
  }
}

export function* updateProductInCart({ type, cartId, productId, quantity }: IUpdateCart) {
  try {
    const response: Response = yield call(api.updateProductInCart, cartId, productId, quantity);
    yield put(actions.updateProductInCartSuccess(response));
    yield put(actions.getCart(cartId));
  } catch (error) {
    yield put(actions.updateProductInCartFailure());
  }
}

export function* deleteProductFromCart({ type, cartId, productId }: IDeleteProductFromCart) {
  try {
    const response: Response = yield call(api.deleteProductFromCart, cartId, productId);
    yield put(actions.deleteProductFromCartSuccess(response));
    yield put(actions.getCart(cartId));
  } catch (error) {
    yield put(actions.deleteProductFromCartFailure());
  }
}

export function* clearCart({ type, cartId }: IClearCart) {
  try {
    const response: Response = yield call(api.clearCart, cartId);
    yield put(actions.clearCartSuccess(response));
  } catch (error) {
    yield put(actions.clearCartFailure());
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.GET_CART, getCart),
    takeEvery(types.ADD_PRODUCT_TO_CART, addProductToCart),
    takeEvery(types.UPDATE_PRODUCT_IN_CART, updateProductInCart),
    takeEvery(types.DELETE_PRODUCT_FROM_CART, deleteProductFromCart),
    takeEvery(types.CLEAR_CART, clearCart),
  ]);
}
