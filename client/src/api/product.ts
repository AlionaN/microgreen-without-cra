import { IProduct, IProductFilters, IProductPaginate } from '@/interfaces';
import { apiURL } from './apiConfig';

export const getProducts = async ( filters?: IProductFilters, sorting?: string, paginate?: IProductPaginate ) => {
  const query = [];
  const limit = paginate?.limit || 6;

  if (filters) {
    const filtersObj = Object.entries(JSON.parse(JSON.stringify(filters)));

    for (const [key, value] of (filtersObj)) {
      if (value && !(value === '') && !(value == 0)) {
        query.push(`${key}=${value}`);
      }
    }
  }

  const sortingQuery = filters && sorting ? `&${sorting}` : sorting;
  
  const paginateQuery = `${sorting || query.length !== 0 ? '&' : ''}page=${paginate?.page}&limit=${limit}`;

  const response = await fetch(`${apiURL}/products${query.length !== 0 || sortingQuery || paginateQuery ? '?' : ''}${query && query.join('&')}${sorting ? sortingQuery : ''}${paginateQuery ? paginateQuery : ''}`);
  const result = await response.json();

  return result;
};

export const getProduct = async (id: string) => {
  const response = await fetch(`${apiURL}/products/${id}`);
  const result = response.json();

  return result;
};

export const postProduct = async (data: IProduct) => {
  const response = await fetch(`${apiURL}/products`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  const result = await response.json();

  return result;
};

export const editProduct = async (id: string, data: IProduct) => {
  const response = await fetch(`${apiURL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
};

export const deleteProduct = async (id: string) => {
  const response = await fetch(`${apiURL}/products/${id}`, {
    method: 'DELETE',
  });

  const result = await response.json();

  return result;
};


