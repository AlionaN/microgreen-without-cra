import React from 'react';
import { Main } from '@components/AppLayout';
import { Button } from '@components/Button';

export const Error404: React.FC = () => {
  return (
    <Main>
      <>
        <div>404</div>
        <div>Page not found</div>
        <Button btnText="Go to home" />
      </>
    </Main>
  );
};
