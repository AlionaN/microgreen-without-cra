import { combineReducers } from 'redux';
import { userReducer } from './user';
import { categoryReducer } from './category';
import { productReducer } from './product';

export const rootReducer = combineReducers({
  userReducer,
  categoryReducer,
  productReducer
});

export type RootState = ReturnType<typeof rootReducer>;
