import React from 'react';
import styles from './Button.module.scss';
import { MouseEvent } from 'react';

interface IProps {
  btnText: string | JSX.Element,
  classes?: string,
  onClick: (e: MouseEvent<HTMLButtonElement | JSX.Element | MouseEvent>) => void,
}

export const Button: React.FC<IProps> = ({ btnText, classes, onClick }: IProps) => {
  return (
    <button className={`${styles.btn} ${classes}`} onClick={(e) => onClick(e)}>{btnText}</button>
  );
}
