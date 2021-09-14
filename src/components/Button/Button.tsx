import React from 'react';
import styles from './Button.module.scss';

interface IProps {
  btnText: string,
  classes?: string
}

export const Button: React.FC<IProps> = ({ btnText, classes }: IProps) => {
  return (
    <button type="button" className={`${styles.btn} ${classes}`}>{btnText}</button>
  );
}
