import React from 'react';
import { Main } from '@/components/AppLayout';
import { Button } from '@/components/Button';

export const Error404: React.FC = () => {
  return (
    <Main>
      <>
        <div>403</div>
        <div>You don`t have permission</div>
        <Button btnText="Go to home" />
      </>
    </Main>
  );
};
