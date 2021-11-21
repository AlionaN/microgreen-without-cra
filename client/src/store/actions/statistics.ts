import * as types from '../actionTypes';

export const getUserStatistics = (dateStart?: string | Date, dateEnd?: string | Date, periodValue?: string) => ({
  type: types.GET_USERS_STATISTICS,
  dateStart,
  dateEnd,
  periodValue,
});

export const getUserStatisticsSuccess = (payload: any) => ({
  type: types.GET_USERS_STATISTICS_SUCCESS,
  payload
});

export const getUserStatisticsFailure = () => ({
  type: types.GET_USERS_STATISTICS_FAILURE
});

export const clearGetUserStatisticsStatus = () => ({
  type: types.CLEAR_GET_USERS_STATISTICS_STATUS
});

export const getProductStatistics = (dateStart?: string | Date, dateEnd?: string | Date, categoryId?: string, periodValue?: string) => ({
  type: types.GET_PRODUCTS_STATISTICS,
  dateStart,
  dateEnd,
  categoryId,
  periodValue,
});

export const getProductStatisticsSuccess = (payload: any) => ({
  type: types.GET_PRODUCTS_STATISTICS_SUCCESS,
  payload
});

export const getProductStatisticsFailure = () => ({
  type: types.GET_PRODUCTS_STATISTICS_FAILURE
});

export const clearGetProductStatisticsStatus = () => ({
  type: types.CLEAR_GET_PRODUCTS_STATISTICS_STATUS
});
