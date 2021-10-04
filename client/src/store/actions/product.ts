import * as types from '../actionTypes/product';
import { IProduct } from '@/interfaces';

export const getProducts = () => ({ 
  type: types.GET_PRODUCTS,
});

export const getProductsSuccess = (payload: any) => ({ 
  type: types.GET_PRODUCTS_SUCCESS,
  payload
});

export const getProductsFailure = (payload: Error) => ({ 
  type: types.GET_PRODUCTS_FAILURE,
  payload
});

export const clearGetProductsStatus = () => ({ 
  type: types.CLEAR_GET_PRODUCTS_STATUS,
});

export const getProduct = () => ({ 
  type: types.GET_PRODUCT,
});

export const getProductSuccess = (payload: any) => ({ 
  type: types.GET_PRODUCT_SUCCESS,
  payload
});

export const getProductFailure = (payload: Error) => ({ 
  type: types.GET_PRODUCT_FAILURE,
  payload
});

export const clearGetProductStatus = () => ({ 
  type: types.CLEAR_GET_PRODUCT_STATUS,
});

export const postProduct = () => ({ 
  type: types.POST_PRODUCT,
});

export const postProductSuccess = (payload: any) => ({ 
  type: types.POST_PRODUCT_SUCCESS,
  payload
});

export const postProductFailure = (payload: Error) => ({ 
  type: types.POST_PRODUCT_FAILURE,
  payload
});

export const clearPostProductStatus = () => ({ 
  type: types.CLEAR_POST_PRODUCT_STATUS,
});

export const editProduct = () => ({ 
  type: types.EDIT_PRODUCT,
});

export const editProductSuccess = (payload: any) => ({ 
  type: types.EDIT_PRODUCT_SUCCESS,
  payload
});

export const editProductFailure = (payload: Error) => ({ 
  type: types.EDIT_PRODUCT_FAILURE,
  payload
});

export const clearEditProductStatus = () => ({ 
  type: types.CLEAR_EDIT_PRODUCT_STATUS,
});

export const deleteProduct = () => ({ 
  type: types.DELETE_PRODUCT,
});

export const deleteProductSuccess = () => ({ 
  type: types.DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailure = (payload: Error) => ({ 
  type: types.DELETE_PRODUCT_FAILURE,
  payload
});

export const clearDeleteProductStatus = () => ({ 
  type: types.CLEAR_DELETE_PRODUCT_STATUS,
});