import { IProduct } from '@/interfaces';
import { apiURL } from './apiConfig';

export const getProducts = async () => {
  const response = await fetch(`${apiURL}/products`);
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


