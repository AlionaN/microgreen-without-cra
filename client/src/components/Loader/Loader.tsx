import React from 'react';
import styles from './Loader.module.scss';
import { BiLoaderAlt } from 'react-icons/bi';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loader}><BiLoaderAlt /></div>
  );
};
