import * as types from '@/store/actionTypes/product';
import * as helpers from '@/store/helpers';
import { IProduct, IStatus, IProductFilters } from '@/interfaces';
import { AnyAction, Reducer } from 'redux';

interface IInitialState {
  products: IProduct[],
  getProductsStatus: IStatus,
  product: IProduct | null,
  getProductStatus: IStatus,
  postProductStatus: IStatus,
  deleteProductStatus: IStatus,
  editProductStatus: IStatus,
  filters: IProductFilters,
  sorting: string,
}

const initialState: IInitialState = {
  products: [],
  getProductsStatus: helpers.getDefaultState(),
  product: null,
  getProductStatus: helpers.getDefaultState(),
  postProductStatus: helpers.getDefaultState(),
  deleteProductStatus: helpers.getDefaultState(),
  editProductStatus: helpers.getDefaultState(),
  filters: {
    category: '',
    maxPrice: 0,
    minPrice: 0,
  },
  sorting: '',
};

export const productReducer: Reducer = (state: IInitialState = initialState, action: AnyAction) => {
  switch(action.type) {
    case types.GET_PRODUCTS: {
      const { filters, sorting } = action;
      return {
        ...state,
        getProductsStatus: helpers.getRequestState(),
        filters,
        sorting
      };
    };
    case types.GET_PRODUCTS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        getProductsStatus: helpers.getSuccessState('Products successfully found'),
        products: payload,
      };
    };
    case types.GET_PRODUCTS_FAILURE: {
      return {
        ...state,
        getProductsStatus: helpers.getErrorState('Products not found'),
      };
    };
    case types.CLEAR_GET_PRODUCTS_STATUS: {
      return {
        ...state,
        getProductsStatus: helpers.getDefaultState(),
      };
    };
    case types.GET_PRODUCT: {
      return {
        ...state,
        getProductStatus: helpers.getRequestState()
      };
    };
    case types.GET_PRODUCT_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        getProductStatus: helpers.getSuccessState('Product successfully found'),
        product: payload,
      };
    };
    case types.GET_PRODUCT_FAILURE: {
      return {
        ...state,
        getProductStatus: helpers.getErrorState('Product not found'),
      };
    };
    case types.CLEAR_GET_PRODUCT_STATUS: {
      return {
        ...state,
        getProductStatus: helpers.getDefaultState(),
      };
    };
    case types.POST_PRODUCT: {
      return {
        ...state,
        postProductStatus: helpers.getRequestState()
      };
    };
    case types.POST_PRODUCT_SUCCESS: {
      return {
        ...state,
        postProductStatus: helpers.getSuccessState('Product successfully created'),
      };
    };
    case types.POST_PRODUCT_FAILURE: {
      return {
        ...state,
        postProductStatus: helpers.getErrorState('Product not created'),
      };
    };
    case types.CLEAR_POST_PRODUCT_STATUS: {
      return {
        ...state,
        postProductStatus: helpers.getDefaultState(),
      };
    };
    case types.DELETE_PRODUCT: {
      return {
        ...state,
        deleteProductStatus: helpers.getRequestState()
      };
    };
    case types.DELETE_PRODUCT_SUCCESS: {
      return {
        ...state,
        deleteProductStatus: helpers.getSuccessState('Product successfully deleted'),
      };
    };
    case types.DELETE_PRODUCT_FAILURE: {
      return {
        ...state,
        deleteProductStatus: helpers.getErrorState('Product not deleted'),
      };
    };
    case types.CLEAR_DELETE_PRODUCT_STATUS: {
      return {
        ...state,
        deleteProductStatus: helpers.getDefaultState(),
      };
    };
    case types.EDIT_PRODUCT: {
      return {
        ...state,
        editProductStatus: helpers.getRequestState()
      };
    };
    case types.EDIT_PRODUCT_SUCCESS: {
      return {
        ...state,
        editProductStatus: helpers.getSuccessState('Product successfully edited'),
      };
    };
    case types.EDIT_PRODUCT_FAILURE: {
      return {
        ...state,
        editProductStatus: helpers.getErrorState('Product not edited'),
      };
    };
    case types.CLEAR_EDIT_PRODUCT_STATUS: {
      return {
        ...state,
        editProductStatus: helpers.getDefaultState(),
      };
    };
    default: 
      return state;
  }
}
