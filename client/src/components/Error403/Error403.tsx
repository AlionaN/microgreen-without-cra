import React from 'react';
import { Main } from '@/components/AppLayout';
import { Button } from '@/components/Button';
import { useHistory } from 'react-router';
import { Routes } from '@/enums';

export const Error403: React.FC = () => {
  const history = useHistory();

  const onGoHomeClick = () => {
    history.push(Routes.Root);
  };

  return (
    <Main>
      <>
        <div>403</div>
        <div>You don`t have permission</div>
        <Button btnText="Go to home" onClick={onGoHomeClick} />
      </>
    </Main>
  );
};
