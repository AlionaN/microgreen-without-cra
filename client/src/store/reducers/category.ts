import * as types from '@/store/actionTypes/category';
import * as helpers from '@/store/helpers';
import { ICategory, IStatus } from '@/interfaces';
import { AnyAction, Reducer } from 'redux';



interface IInitialState {
  categories: ICategory[],
  getCategoriesStatus: IStatus,
  postCategoriesStatus: IStatus,
}

const initialState: IInitialState = {
  categories: [],
  getCategoriesStatus: helpers.getDefaultState(),
  postCategoriesStatus: helpers.getDefaultState(),
};

export const categoryReducer: Reducer = (state: IInitialState = initialState, action: AnyAction) => {
  switch(action.type) {
    case types.GET_CATEGORIES: {
      return {
        ...state,
        getCategoriesStatus: helpers.getRequestState()
      };
    }
    case types.GET_CATEGORIES_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        getCategoriesStatus: helpers.getSuccessState('Action success'),
        categories: payload,
      };
    }
    case types.GET_CATEGORIES_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        getCategoriesStatus: helpers.getErrorState(payload),
      };
    }
    case types.CLEAR_GET_CATEGORIES_STATUS: {
      return {
        ...state,
        getCategoriesStatus: helpers.getDefaultState()
      };
    }
    case types.POST_CATEGORIES: {
      return {
        ...state,
        postCategoriesStatus: helpers.getRequestState()
      };
    }
    case types.POST_CATEGORIES_SUCCESS: {
      return {
        ...state,
        postCategoriesStatus: helpers.getSuccessState('Action success'),
      };
    }
    case types.GET_CATEGORIES_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        postCategoriesStatus: helpers.getErrorState(payload),
      };
    }
    case types.CLEAR_GET_CATEGORIES_STATUS: {
      return {
        ...state,
        postCategoriesStatus: helpers.getDefaultState()
      };
    }
    default: 
      return state;
  }
}
