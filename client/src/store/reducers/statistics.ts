import { IStatus } from '@/interfaces';
import * as types from '@/store/actionTypes';
import { AnyAction, Reducer } from 'redux';
import * as helpers from '../helpers';

interface IInitialState {
  userStatistics: null | any,
  productStatistics: null | any,
  getUserStatisticsStatus: IStatus,
  getProductStatisticsStatus: IStatus,
};

const initialState: IInitialState = {
  userStatistics: null,
  productStatistics: null,
  getUserStatisticsStatus: helpers.getDefaultState(),
  getProductStatisticsStatus: helpers.getDefaultState(),
};

export const statisticsReducer: Reducer = (state = initialState, action: AnyAction) => {

  switch(action.type) {
    case types.GET_USERS_STATISTICS:
      return {
        ...state,
        getUserStatisticsStatus: helpers.getRequestState()
      };
    
    case types.GET_USERS_STATISTICS_SUCCESS: {
      const { payload } = action;

      return {
        ...state,
        getUserStatisticsStatus: helpers.getSuccessState('You are successfully registered'),
        userStatistics: payload.content,
      };
    };

    case types.GET_USERS_STATISTICS_FAILURE:
      return {
        ...state,
        getUserStatisticsStatus: helpers.getErrorState('Something went wrong. Try again.')
      };

    case types.CLEAR_GET_USERS_STATISTICS_STATUS:
      return {
        ...state,
        getUserStatisticsStatus: helpers.getDefaultState(),
        userStatistics: null,
      };

    case types.GET_PRODUCTS_STATISTICS:
      return {
        ...state,
        getProductStatisticsStatus: helpers.getRequestState()
      };
    
    case types.GET_PRODUCTS_STATISTICS_SUCCESS: {
      const { payload } = action;

      return {
        ...state,
        getProductStatisticsStatus: helpers.getSuccessState('You are successfully login'),
        productStatistics: payload.content,
      };
    }

    case types.GET_PRODUCTS_STATISTICS_FAILURE:
      return {
        ...state,
        getProductStatisticsStatus: helpers.getErrorState('Login or password is incorrect'),
      };

    case types.CLEAR_GET_PRODUCTS_STATISTICS_STATUS:
      return {
        ...state,
        getProductStatisticsStatus: helpers.getDefaultState(),
        productStatistics: null,
      };

    default:
      return state;
  };
};
