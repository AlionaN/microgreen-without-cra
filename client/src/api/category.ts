import { apiURL } from './apiConfig';

export const getCategories = () => fetch(`${apiURL}/categories`, {
  method: 'GET'
});

export const postCategory = (data: BodyInit) => fetch(`${apiURL}/categories`, {
  method: 'POST',
  body: data
});
