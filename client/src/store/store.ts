import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { rootReducer } from './reducers';
import { rootSaga } from './rootSaga';


const sagaMiddleware = createSagaMiddleware();

const appStore = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default appStore;
