import { combineReducers } from 'redux';
import { userReducer } from './user';
import { categoryReducer } from './category';

export const rootReducer = combineReducers({
  userReducer,
  categoryReducer
});

export type RootState = ReturnType<typeof rootReducer>;
