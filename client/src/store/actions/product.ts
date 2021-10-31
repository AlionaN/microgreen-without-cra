import * as types from '../actionTypes/product';
import { IProductFilters, IProductPaginate } from '@/interfaces';

export const getProducts = (filters?: IProductFilters, sorting?: string, paginate?: IProductPaginate) => ({ 
  type: types.GET_PRODUCTS,
  filters,
  sorting,
  paginate
});

export const getProductsSuccess = (payload: any) => ({ 
  type: types.GET_PRODUCTS_SUCCESS,
  payload
});

export const getProductsFailure = () => ({ 
  type: types.GET_PRODUCTS_FAILURE,
});

export const clearGetProductsStatus = () => ({ 
  type: types.CLEAR_GET_PRODUCTS_STATUS,
});

export const getProduct = (productId: string) => ({ 
  type: types.GET_PRODUCT,
  productId
});

export const getProductSuccess = (payload: any) => ({ 
  type: types.GET_PRODUCT_SUCCESS,
  payload
});

export const getProductFailure = () => ({ 
  type: types.GET_PRODUCT_FAILURE,
});

export const clearGetProductStatus = () => ({ 
  type: types.CLEAR_GET_PRODUCT_STATUS,
});

export const postProduct = (payload: any) => ({ 
  type: types.POST_PRODUCT,
  payload
});

export const postProductSuccess = (payload: any) => ({ 
  type: types.POST_PRODUCT_SUCCESS,
  payload
});

export const postProductFailure = () => ({ 
  type: types.POST_PRODUCT_FAILURE,
});

export const clearPostProductStatus = () => ({ 
  type: types.CLEAR_POST_PRODUCT_STATUS,
});

export const editProduct = (id: string, payload: any) => ({ 
  type: types.EDIT_PRODUCT,
  id,
  payload
});

export const editProductSuccess = (payload: any) => ({ 
  type: types.EDIT_PRODUCT_SUCCESS,
  payload
});

export const editProductFailure = () => ({ 
  type: types.EDIT_PRODUCT_FAILURE,
});

export const clearEditProductStatus = () => ({ 
  type: types.CLEAR_EDIT_PRODUCT_STATUS,
});

export const deleteProduct = (payload: string) => ({ 
  type: types.DELETE_PRODUCT,
  payload
});

export const deleteProductSuccess = () => ({ 
  type: types.DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailure = () => ({ 
  type: types.DELETE_PRODUCT_FAILURE,
});

export const clearDeleteProductStatus = () => ({ 
  type: types.CLEAR_DELETE_PRODUCT_STATUS,
});
