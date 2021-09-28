import React from 'react';
import { AppRouter } from '@/features/AppRouter';
import { AdminLayout } from '@/components/AppLayout';
import './App.module.scss';

export const App: React.FC = () => {
  return (
    <AdminLayout>
      <AppRouter />
    </AdminLayout>
  );
};
