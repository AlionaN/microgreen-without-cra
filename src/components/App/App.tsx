import React from 'react';
import { AppRouter } from '@features/AppRouter';
import { AppLayout } from '@components/AppLayout';
import './App.module.scss';

export const App: React.FC = () => {
  return (
    <AppLayout>
      <AppRouter />
    </AppLayout>
  );
};
