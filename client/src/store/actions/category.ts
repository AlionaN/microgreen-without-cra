import * as types from '../actionTypes/category';
import { ICategory } from '@/interfaces';

export const getCategories = () => ({ 
  type: types.GET_CATEGORIES,
});

export const getCategoriesSuccess = (payload: ICategory[]) => ({ 
  type: types.GET_CATEGORIES_SUCCESS,
  payload
});

export const getCategoriesFailure = (payload: Error) => ({ 
  type: types.GET_CATEGORIES_FAILURE,
  payload
});

export const clearGetCategoriesStatus = () => ({ 
  type: types.CLEAR_GET_CATEGORIES_STATUS,
});

export const postCategories = () => ({ 
  type: types.POST_CATEGORIES,
});

export const postCategoriesSuccess = (payload: ICategory) => ({ 
  type: types.POST_CATEGORIES_SUCCESS,
  payload
});

export const postCategoriesFailure = (payload: Error) => ({ 
  type: types.POST_CATEGORIES_FAILURE,
  payload
});

export const clearPostCategoriesStatus = () => ({ 
  type: types.CLEAR_POST_CATEGORIES_STATUS,
});
