import { combineReducers } from 'redux';
import { userReducer } from './user';
import { categoryReducer } from './category';
import { productReducer } from './product';
import { cartReducer } from './cart';
import { guestCartReducer } from './guestCart';
import { statisticsReducer } from './statistics';

export const rootReducer = combineReducers({
  userReducer,
  categoryReducer,
  productReducer,
  cartReducer,
  guestCartReducer,
  statisticsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
