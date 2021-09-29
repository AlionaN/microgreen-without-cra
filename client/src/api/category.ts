import { ICategory } from '@/interfaces';
import { apiURL } from './apiConfig';

export const getCategories = async (): Promise<Response> => {
  const response = await fetch(`${apiURL}/categories`);
  const result = await response.json();
  
  return result;
};

export const postCategory = async (data: ICategory) => {
  const response = await fetch(`${apiURL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  console.log(result);
  
  return result;
};

export const deleteCategory = async (id: string) => {
  const response = await fetch(`${apiURL}/categories/${id}`, {
    method: 'DELETE',
  });

  const result = await response.json();
  console.log(result);

  return result;
};

export const editCategory = async(id: string, data: ICategory) => {
  const response = await fetch(`${apiURL}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
};
