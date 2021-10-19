import React from 'react';
import { AppRouter } from '@/features/AppRouter';
import './App.module.scss';
import { useDispatch } from 'react-redux';
import * as actions from '@/store/actions';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  
  if (token) {
    dispatch(actions.loginSuccess())
  }

  return (
    <AppRouter />
  );
};
