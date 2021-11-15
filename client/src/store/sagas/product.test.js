import { runSaga } from 'redux-saga';
import { call, select, take, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as types from '@/store/actionTypes/product';
import * as actions from '@/store/actions/product';
import * as sagas from '@/store/sagas/product';
import * as helpers from '@/store/helpers';
import * as api from '@/api/product';
import productReducer from '@/store/reducers/product';
import { throwError } from 'redux-saga-test-plan/providers';

const productsSelector = (state) => state.productReducer.products;

const newProduct = {
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
]

async function recordSaga(saga, initialAction) {
  const dispatched = [];

  await runSaga(
    {
      dispatch: (action) => dispatched.push(action)
    },
    saga,
    initialAction
  ).done;

  return dispatched;
}

describe('62105055', () => {

  api.getProducts = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetchs get products failure', () => async () => {
    productsSelector.mockImplementation(() => productsStore);
  
    const initialAction = {};
    const dispatched = await recordSaga(
      actions.getProducts,
      initialAction
    );

    console.log(dispatched);
  
    expect(dispatched).toContainEqual(actions.getProductsFailure());
    expect(api.getProducts).not.toHaveBeenCalled();
  });

  // it('should test fetches posts', () => {
  //   const posts = { posts: [] };
  //   return expectSaga(watchPosts)
  //     .provide([[call(api.post.getPosts), posts]])
  //     .put({ type: types.GET_POSTS_SUCCESS, payload: { posts } })
  //     .dispatch({ type: types.GET_POSTS_INIT })
  //     .silentRun();
  // });
});
