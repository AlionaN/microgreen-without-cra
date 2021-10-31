import { IGuestCart, ICartItem } from '@/interfaces';
import * as types from '@/store/actionTypes';
import { AnyAction, Reducer } from 'redux';
import { parseStorageItem } from '@/helpers';

interface IInitialState {
  guestCart: null | IGuestCart,
};

const initialState: IInitialState = {
  guestCart: null,
};

export const guestCartReducer: Reducer = (state = initialState, action: AnyAction) => {
  switch(action.type) {
    case types.GET_GUEST_CART:
      const cart = parseStorageItem(localStorage.getItem('cart'));

      return {
        ...state,
        guestCart: {...cart}
      };

    case types.ADD_PRODUCT_TO_GUEST_CART: {
      const { product, quantity } = action;
      const isProductInGuestCart = state.guestCart.items.some((item: ICartItem) => item.product._id === product._id);
      const { guestCart } = state;

      if (isProductInGuestCart) {
        guestCart.items.map((item: ICartItem) => {
          if (item.product._id === product._id) {
            item.quantity += quantity;
          }
        });
      } else {
        guestCart.items.push({ product, quantity, itemPrice: product.price * quantity });
      }

      guestCart.totalQuantity = guestCart.totalQuantity + quantity;
      guestCart.totalPrice = guestCart.totalPrice + product.price * quantity;
      localStorage.setItem('cart', JSON.stringify(guestCart));

      return {
        ...state,
        guestCart: parseStorageItem(localStorage.getItem('cart'))
      };
    };

    case types.UPDATE_PRODUCT_IN_GUEST_CART: {
      const { guestCart } = state;
      const { productId, quantity } = action;

      guestCart.items.map((guestItem: ICartItem) => {
        if (guestItem.product._id === productId) {
          const oldQuantity = guestItem.quantity;
          guestItem.quantity = quantity;
          guestItem.itemPrice = guestItem.product.price * quantity;
          guestCart.totalPrice = guestCart.totalPrice - (oldQuantity * guestItem.product.price) + guestItem.itemPrice;
          guestCart.totalQuantity = guestCart.totalQuantity - oldQuantity + quantity;
        }
      });

      localStorage.setItem('cart', JSON.stringify(guestCart));

      return {
        ...state,
        guestCart: parseStorageItem(localStorage.getItem('cart'))
      };
    };

    case types.DELETE_PRODUCT_FROM_GUEST_CART: {
      const { guestCart } = state;
      const { productId } = action;
      const productForDelete = guestCart.items.find((item: ICartItem) => item.product._id === productId);

      guestCart.items.splice(guestCart.items.findIndex((item: ICartItem) => item.product._id === productId), 1);
      guestCart.totalPrice -= productForDelete.itemPrice * productForDelete.quantity;
      guestCart.totalQuantity -= productForDelete.quantity;
      localStorage.setItem('cart', JSON.stringify(guestCart));

      return {
        ...state,
        guestCart: parseStorageItem(localStorage.getItem('cart'))
      };
    };
      
    case types.CLEAR_GUEST_CART:
      localStorage.setItem('cart', JSON.stringify({
        items: [],
        totalQuantity: 0,
        totalPrice: 0
      }));

      return {
        ...state,
        guestCart: parseStorageItem(localStorage.getItem('cart'))
      };

    default:
      return state;
  };
};
