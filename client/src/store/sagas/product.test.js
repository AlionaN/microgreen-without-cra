import sagaHelper from 'redux-saga-testing';
import { call, put } from 'redux-saga/effects';
import { getProducts } from '../../api';
import * as actions from '../actions';
import * as sagas from '../sagas/product';

const product = {
  "id": 16,
  "categoryId": 1,
  "title": "Coconut Soil Brick",
  "description": "Coconut soil is a great alternative to the classic soil. It comes in dry and pressed form and can therefore be stored very well. It provides a practical basis for both your Grow-Grow Nut and other Microgreen projects.",
  "amount": 10,
  "image": "soilBricks.jpg",
  "price": 4.9
};

const productsStore = [
  {
    "id": 16,
    "categoryId": 1,
    "title": "Coconut Soil Brick",
    "description": "Coconut soil is a great alternative to the classic soil. It comes in dry and pressed form and can therefore be stored very well. It provides a practical basis for both your Grow-Grow Nut and other Microgreen projects.",
    "amount": 10,
    "image": "soilBricks.jpg",
    "price": 4.9
  },
  {
    "id": 12,
    "categoryId": 1,
    "title": "Coconut Soil Brick",
    "description": "Coconut soil is a great alternative to the classic soil. It comes in dry and pressed form and can therefore be stored very well. It provides a practical basis for both your Grow-Grow Nut and other Microgreen projects.",
    "amount": 100,
    "image": "soilBricks.jpg",
    "price": 45.9
  },
];

const api = jest.fn();
const getProductsSuccessAction = () => ({ type: 'GET_PRODUCTS_SUCCESS', payload: productsStore });

function* successGetProducts() {
  yield call(api);
  yield put(getProductsSuccessAction());
}

describe('get products success saga', () => {

  let it = sagaHelper(successGetProducts());

  it('should be equal to call(api)', (result) => {
    expect(result).toEqual(call(api));
    expect(api).not.toHaveBeenCalled();
  });

  it('should be equal productsStore', (result) => {
    expect(result.payload.action.payload).toBe(productsStore);
  });

  it('should return undefined', (result) => {
    expect(result).toBeUndefined();
  });
});


const getProductsFailureAction = () => ({ type: 'GET_PRODUCTS_FAILURE', payload: 'Something went wrong' });

function* failureGetProducts() {
  yield call(api);
  yield put(getProductsFailureAction());
}

describe('get products failure saga', () => {

  let it = sagaHelper(failureGetProducts());

  it('should be equal to call(api)', (result) => {
    expect(result).toEqual(call(api));
    expect(api).not.toHaveBeenCalled();
  });

  it('should be equal "Something went wrong"', (result) => {
    expect(result.payload.action.payload).toBe('Something went wrong');
  });

  it('should return undefined', (result) => {
    expect(result).toBeUndefined();
  });
});


