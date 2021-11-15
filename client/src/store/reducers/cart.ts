import { ICart, IStatus } from '@/interfaces';
import * as types from '@/store/actionTypes';
import { AnyAction, Reducer } from 'redux';
import * as helpers from '../helpers';

interface IInitialState {
  cart: null | ICart,
  getCartStatus: IStatus,
  addProductToCartStatus: IStatus,
  clearCartStatus: IStatus,
  updateProductInCartStatus: IStatus,
  deleteProductFromCartStatus: IStatus,
};

const initialState: IInitialState = {
  cart: null,
  getCartStatus: helpers.getDefaultState(),
  addProductToCartStatus: helpers.getDefaultState(),
  clearCartStatus: helpers.getDefaultState(),
  updateProductInCartStatus: helpers.getDefaultState(),
  deleteProductFromCartStatus: helpers.getDefaultState(),
};

export const cartReducer: Reducer = (state = initialState, action: AnyAction) => {
  switch(action.type) {
    case types.GET_CART:
      return {
        ...state,
        getCartStatus: helpers.getRequestState()
      };
    
    case types.GET_CART_SUCCESS: {
      const { payload } = action;

      return {
        ...state,
        getCartStatus: helpers.getSuccessState('Cart successfully found'),
        cart: payload,
      };
    };

    case types.GET_CART_FAILURE:
      return {
        ...state,
        getCartStatus: helpers.getErrorState('Something went wrong. Try again.')
      };

    case types.CLEAR_GET_CART_STATUS:
      return {
        ...state,
        getCartStatus: helpers.getDefaultState()
      };

    case types.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        addProductToCartStatus: helpers.getRequestState()
      };
    
    case types.ADD_PRODUCT_TO_CART_SUCCESS: {
      const { payload } = action;

      return {
        ...state,
        addProductToCartStatus: helpers.getSuccessState('Cart successfully updated'),
        cart: payload
      };
    };
      
    case types.ADD_PRODUCT_TO_CART_FAILURE:
      return {
        ...state,
        addProductToCartStatus: helpers.getErrorState('Something went wrong'),
      };

    case types.CLEAR_ADD_PRODUCT_TO_CART_STATUS:
      return {
        ...state,
        addProductToCartStatus: helpers.getDefaultState(),
      };

    case types.UPDATE_PRODUCT_IN_CART:
      return {
        ...state,
        updateProductInCartStatus: helpers.getRequestState()
      };
    
    case types.UPDATE_PRODUCT_IN_CART_SUCCESS: {
      const { payload } = action;

      return {
        ...state,
        updateProductInCartStatus: helpers.getSuccessState('Cart successfully updated'),
        cart: payload
      };
    };
      
    case types.UPDATE_PRODUCT_IN_CART_FAILURE:
      return {
        ...state,
        updateProductInCartStatus: helpers.getErrorState('Something went wrong'),
      };

    case types.CLEAR_UPDATE_PRODUCT_IN_CART_STATUS:
      return {
        ...state,
        updateProductInCartStatus: helpers.getDefaultState(),
      };

      case types.DELETE_PRODUCT_FROM_CART:
        return {
          ...state,
          deleteProductFromCartStatus: helpers.getRequestState()
        };
      
      case types.DELETE_PRODUCT_FROM_CART_SUCCESS: {
        const { payload } = action;

        return {
          ...state,
          deleteProductFromCartStatus: helpers.getSuccessState('Cart successfully updated'),
          cart: payload
        };
      };
        
      case types.DELETE_PRODUCT_FROM_CART_FAILURE:
        return {
          ...state,
          deleteProductFromCartStatus: helpers.getErrorState('Something went wrong'),
        };
  
      case types.CLEAR_DELETE_PRODUCT_FROM_CART_STATUS:
        return {
          ...state,
          deleteProductFromCartStatus: helpers.getDefaultState(),
        };
      
    case types.CLEAR_CART:
      return {
        ...state,
        clearCartStatus: helpers.getRequestState()
      };
    
    case types.CLEAR_CART_SUCCESS: {
      const { payload } = action;

      return {
        ...state,
        clearCartStatus: helpers.getSuccessState('Cart successfully cleared'),
        cart: payload
      };
    };
      
    case types.CLEAR_CART_FAILURE:
      return {
        ...state,
        clearCartStatus: helpers.getErrorState('Something went wrong'),
      };

    case types.CLEAR_CLEAR_CART_STATUS:
      return {
        ...state,
        clearCartStatus: helpers.getDefaultState(),
      };

    case types.REMOVE_CART:
      return {
        ...state,
        cart: null,
      };

    default:
      return state;
  };
};
