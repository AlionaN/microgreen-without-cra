import * as types from '../actionTypes/category';
import { ICategory } from '@/interfaces';

export const getCategories = () => ({ 
  type: types.GET_CATEGORIES,
});

export const getCategoriesSuccess = (payload: any) => ({ 
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

export const postCategory = (payload: ICategory) => ({ 
  type: types.POST_CATEGORY,
  payload
});

export const postCategorySuccess = (payload: ICategory) => ({ 
  type: types.POST_CATEGORY_SUCCESS,
  payload
});

export const postCategoryFailure = (payload: Error) => ({ 
  type: types.POST_CATEGORY_FAILURE,
  payload
});

export const clearPostCategoryStatus = () => ({ 
  type: types.CLEAR_POST_CATEGORY_STATUS,
});

export const deleteCategory = (payload: string) => ({ 
  type: types.DELETE_CATEGORY,
  payload
});

export const deleteCategorySuccess = () => ({ 
  type: types.DELETE_CATEGORY_SUCCESS
});

export const deleteCategoryFailure = (payload: Error) => ({ 
  type: types.DELETE_CATEGORY_FAILURE,
  payload
});

export const clearDeleteCategoryStatus = () => ({ 
  type: types.CLEAR_DELETE_CATEGORY_STATUS,
});

export const editCategory = (payload: string) => ({ 
  type: types.EDIT_CATEGORY,
  payload
});

export const editCategorySuccess = () => ({ 
  type: types.EDIT_CATEGORY_SUCCESS,
});

export const editCategoryFailure = (payload: Error) => ({ 
  type: types.EDIT_CATEGORY_FAILURE,
  payload
});

export const clearEditCategoryStatus = () => ({ 
  type: types.CLEAR_EDIT_CATEGORY_STATUS,
});
