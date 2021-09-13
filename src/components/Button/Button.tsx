import React from 'react';
import styles from './Button.module.scss';

interface IProps {
  btnText: string
}

export const Button: React.FC<IProps> = ({ btnText }: IProps) => {
  return (
    <button type="button" className={styles.btn}>{btnText}</button>
  );
}
