import React from 'react';

interface IProps {
  classes?: string,
  children: JSX.Element,
};

export const Main: React.FC<IProps> = ({ classes, children }: IProps) => {
  return (
    <main className={classes}>{children}</main>
  );
};
