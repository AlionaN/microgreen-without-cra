import { createDateWithHyphen } from '@/helpers';
import { apiURL } from './apiConfig';

export const getUserStatistics = async ( dateStart?: string, dateEnd?: string, periodValue?: string ) => {
  const month = (new Date).getMonth();
  const year = (new Date).getFullYear();
  const query = `?dateStart=${dateStart || new Date(year, month, 1)}&dateEnd=${dateEnd || new Date() }&periodValue=${periodValue || 'day'}`;
  
  const response = await fetch(`${apiURL}/statistics-user${query}`);
  const result = await response.json();

  return result;
};

export const getProductStatistics = async ( dateStart?: string, dateEnd?: string, categoryId?: string, periodValue?: string ) => {
  const month = (new Date).getMonth();
  const year = (new Date).getFullYear();
  const query = `?dateStart=${dateStart || createDateWithHyphen(new Date(year, month, 1))}&dateEnd=${dateEnd || createDateWithHyphen(new Date())}&periodValue=${periodValue || 'day'}`;

  categoryId && query.concat('', `&categoryId=${categoryId}`);
  
  const response = await fetch(`${apiURL}/statistics-product${query}`);
  const result = await response.json();

  return result;
};
