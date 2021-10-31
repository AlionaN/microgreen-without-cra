import { combineReducers } from 'redux';
import { userReducer } from './user';
import { categoryReducer } from './category';
import { productReducer } from './product';
import { cartReducer } from './cart';
import { guestCartReducer } from './guestCart';

export const rootReducer = combineReducers({
  userReducer,
  categoryReducer,
  productReducer,
  cartReducer,
  guestCartReducer
});

export type RootState = ReturnType<typeof rootReducer>;
