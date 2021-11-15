import { apiURL } from './apiConfig';

export const getCart = async (cartId: string): Promise<Response> => {
  const response = await fetch(`${apiURL}/cart/${cartId}`);
  const result = await response.json();
  
  return result;
};

export const addProductToCart = async (cartId: string, productId: string, quantity: number): Promise<Response> => {
  const response = await fetch(`${apiURL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ cartId, productId, quantity })
  });

  const result = await response.json();
  
  return result;
};

export const updateProductInCart = async (cartId: string, productId: string, quantity: number): Promise<Response> => {
  const response = await fetch(`${apiURL}/cart`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ cartId, productId, quantity })
  });

  const result = await response.json();
  
  return result;
};

export const deleteProductFromCart = async (cartId: string, productId: string): Promise<Response> => {
  const response = await fetch(`${apiURL}/cart`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ cartId, productId })
  });
  
  const result = await response.json();
  
  return result;
};

export const clearCart = async (cartId: string): Promise<Response> => {
  const response = await fetch(`${apiURL}/cart/clear`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ cartId }),
  });

  const result = await response.json();
  
  return result;
};
