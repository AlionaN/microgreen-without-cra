import React, { useEffect } from 'react';
import { AppRouter } from '@/features/AppRouter';
import './App.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '@/store/actions';
import { RootState } from '@/store/reducers';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const user = useSelector((state: RootState) => state.userReducer.user);
  
  useEffect(() => {
    userId && userId !== null && dispatch(actions.getUser(userId));
  }, []);

  useEffect(() => {
    if (user && user !== null) { 
      dispatch(actions.getCart(user.cart));
    } else if (!localStorage.getItem('cart')){
      localStorage.setItem('cart', JSON.stringify({
        items: [],
        totalPrice: 0,
        totalQuantity: 0
      }));
      dispatch(actions.getGuestCart());
    }
  }, []);
  
  if (token && userId) {
    dispatch(actions.loginSuccess());
    localStorage.removeItem('cart');
  }

  return (
    <AppRouter />
  );
};
