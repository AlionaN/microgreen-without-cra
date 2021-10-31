import * as types from '../actionTypes';
import { ICartItem } from '@/interfaces';

export const getCart = (cartId: string) => ({ 
  type: types.GET_CART,
  cartId
});

export const getCartSuccess = (payload: any) => ({ 
  type: types.GET_CART_SUCCESS,
  payload
});

export const getCartFailure = () => ({ 
  type: types.GET_CART_FAILURE
});

export const clearGetCartStatus = () => ({ 
  type: types.CLEAR_GET_CART_STATUS,
});

export const addProductToCart = (cartId: string, productId: string, quantity: number) => ({ 
  type: types.ADD_PRODUCT_TO_CART,
  cartId,
  productId,
  quantity
});

export const addProductToCartSuccess = (payload: any) => ({ 
  type: types.ADD_PRODUCT_TO_CART_SUCCESS,
  payload
});

export const addProductToCartFailure = () => ({ 
  type: types.ADD_PRODUCT_TO_CART_FAILURE
});

export const clearAddProductToCartStatus = () => ({ 
  type: types.CLEAR_ADD_PRODUCT_TO_CART_STATUS,
});

export const updateProductInCart = (cartId: string, productId: string, quantity: number) => ({ 
  type: types.UPDATE_PRODUCT_IN_CART,
  cartId,
  productId,
  quantity
});

export const updateProductInCartSuccess = (payload: any) => ({ 
  type: types.UPDATE_PRODUCT_IN_CART_SUCCESS,
  payload
});

export const updateProductInCartFailure = () => ({ 
  type: types.UPDATE_PRODUCT_IN_CART_FAILURE
});

export const clearUpdateProductInCartStatus = () => ({ 
  type: types.CLEAR_UPDATE_PRODUCT_IN_CART_STATUS,
});

export const deleteProductFromCart = (cartId: string, productId: string) => ({ 
  type: types.DELETE_PRODUCT_FROM_CART,
  cartId,
  productId,
});

export const deleteProductFromCartSuccess = (payload: any) => ({ 
  type: types.DELETE_PRODUCT_FROM_CART_SUCCESS,
  payload
});

export const deleteProductFromCartFailure = () => ({ 
  type: types.DELETE_PRODUCT_FROM_CART_FAILURE
});

export const clearDeleteProductFromCartStatus = () => ({ 
  type: types.CLEAR_DELETE_PRODUCT_FROM_CART_STATUS,
});

export const clearCart = (cartId: string) => ({ 
  type: types.CLEAR_CART,
  cartId,
});

export const clearCartSuccess = (payload: any) => ({ 
  type: types.CLEAR_CART_SUCCESS,
  payload
});

export const clearCartFailure = () => ({ 
  type: types.CLEAR_CART_FAILURE
});

export const clearClearCartStatus = () => ({ 
  type: types.CLEAR_CLEAR_CART_STATUS,
});

export const removeCart = () => ({
  type: types.REMOVE_CART,
});
