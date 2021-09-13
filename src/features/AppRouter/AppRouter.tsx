import React from 'react';
import { renderRoutes } from 'react-router-config';
import { routerConfig } from '@router';

export const AppRouter: React.FC = () => {
  return (
    <>
      {renderRoutes(routerConfig)}
    </>
  );
};
