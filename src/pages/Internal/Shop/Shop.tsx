import React from 'react';
import styles from './Shop.module.scss';
import products from '../../../products';
import { Cards } from '@/components/Cards';

export const Shop: React.FC = () => {
  return (
    <div className={styles.shop}>
      <Cards cardsList={products} />
    </div>
  );
}
