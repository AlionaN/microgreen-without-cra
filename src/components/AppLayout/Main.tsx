/* eslint-disable import/prefer-default-export */
import React from 'react';

export const Main: React.FC<{ className?: string, children: JSX.Element }> = ({
  className, children,
}) => {
  return (
    <main className={className}>{children}</main>
  );
};

Main.defaultProps = {
  className: '',
};
