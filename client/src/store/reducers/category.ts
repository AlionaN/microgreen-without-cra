import * as types from '@/store/actionTypes/category';
import * as helpers from '@/store/helpers';
import { ICategory, IStatus } from '@/interfaces';
import { AnyAction, Reducer } from 'redux';

interface IInitialState {
  categories: ICategory[],
  category: ICategory | null,
  getCategoryStatus: IStatus,
  getCategoriesStatus: IStatus,
  postCategoryStatus: IStatus,
  deleteCategoryStatus: IStatus,
  editCategoryStatus: IStatus,
}

const initialState: IInitialState = {
  categories: [],
  category: null,
  getCategoryStatus: helpers.getDefaultState(),
  getCategoriesStatus: helpers.getDefaultState(),
  postCategoryStatus: helpers.getDefaultState(),
  deleteCategoryStatus: helpers.getDefaultState(),
  editCategoryStatus: helpers.getDefaultState(),
};

export const categoryReducer: Reducer = (state: IInitialState = initialState, action: AnyAction) => {
  switch(action.type) {
    case types.GET_CATEGORIES: {
      return {
        ...state,
        getCategoriesStatus: helpers.getRequestState()
      };
    };

    case types.GET_CATEGORIES_SUCCESS: {
      const { payload } = action;
      
      return {
        ...state,
        getCategoriesStatus: helpers.getSuccessState('Categories successfully found'),
        categories: payload,
      };
    };

    case types.GET_CATEGORIES_FAILURE: {
      return {
        ...state,
        getCategoriesStatus: helpers.getErrorState('Categories not found'),
      };
    };

    case types.CLEAR_GET_CATEGORIES_STATUS: {
      return {
        ...state,
        getCategoriesStatus: helpers.getDefaultState(),
      };
    };

    case types.GET_CATEGORY: {
      return {
        ...state,
        getCategoryStatus: helpers.getRequestState(),
      };
    };

    case types.GET_CATEGORY_SUCCESS: {
      const { payload } = action;

      return {
        ...state,
        getCategoryStatus: helpers.getSuccessState('Category successfully found'),
        category: payload,
      };
    };

    case types.GET_CATEGORY_FAILURE: {
      return {
        ...state,
        getCategoryStatus: helpers.getErrorState('Category not found'),
      };
    };

    case types.CLEAR_GET_CATEGORY_STATUS: {
      return {
        ...state,
        getCategoryStatus: helpers.getDefaultState(),
        category: null
      };
    };

    case types.POST_CATEGORY: {
      return {
        ...state,
        postCategoryStatus: helpers.getRequestState()
      };
    };

    case types.POST_CATEGORY_SUCCESS: {
      return {
        ...state,
        postCategoryStatus: helpers.getSuccessState('Category successfully created'),
      };
    };

    case types.POST_CATEGORY_FAILURE: {
      return {
        ...state,
        postCategoryStatus: helpers.getErrorState('Category not created'),
      };
    };

    case types.CLEAR_POST_CATEGORY_STATUS: {
      return {
        ...state,
        postCategoryStatus: helpers.getDefaultState(),
      };
    };

    case types.DELETE_CATEGORY: {
      return {
        ...state,
        deleteCategoryStatus: helpers.getRequestState()
      };
    };

    case types.DELETE_CATEGORY_SUCCESS: {
      return {
        ...state,
        deleteCategoryStatus: helpers.getSuccessState('Category successfully deleted'),
      };
    };

    case types.DELETE_CATEGORY_FAILURE: {
      return {
        ...state,
        deleteCategoryStatus: helpers.getErrorState('Category not deleted'),
      };
    };

    case types.CLEAR_DELETE_CATEGORY_STATUS: {
      return {
        ...state,
        deleteCategoryStatus: helpers.getDefaultState(),
      };
    };

    case types.EDIT_CATEGORY: {
      return {
        ...state,
        editCategoryStatus: helpers.getRequestState()
      };
    };

    case types.EDIT_CATEGORY_SUCCESS: {
      return {
        ...state,
        editCategoryStatus: helpers.getSuccessState('Category successfully edited'),
      };
    };

    case types.EDIT_CATEGORY_FAILURE: {
      return {
        ...state,
        editCategoryStatus: helpers.getErrorState('Category not edited'),
      };
    };

    case types.CLEAR_EDIT_CATEGORY_STATUS: {
      return {
        ...state,
        editCategoryStatus: helpers.getDefaultState(),
      };
    };

    default: 
      return state;
  };
};
