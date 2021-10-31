import * as types from '../actionTypes';
import { IProductFromDB } from '@/interfaces';

export const getGuestCart = () => ({ 
  type: types.GET_GUEST_CART
});

export const addProductToGuestCart = (product: IProductFromDB, quantity: number) => ({ 
  type: types.ADD_PRODUCT_TO_GUEST_CART,
  product,
  quantity
});

export const updateProductInGuestCart = (productId: string, quantity: number) => ({ 
  type: types.UPDATE_PRODUCT_IN_GUEST_CART,
  productId,
  quantity
});

export const deleteProductFromGuestCart = (productId: string) => ({ 
  type: types.DELETE_PRODUCT_FROM_GUEST_CART,
  productId,
});

export const clearGuestCart = () => ({ 
  type: types.CLEAR_GUEST_CART,
});

