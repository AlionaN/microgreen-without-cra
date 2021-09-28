import React from 'react';
import styles from './Shop.module.scss';
import products from '../../../products';
import { Cards } from '@/components/Cards';
import { AppLayout } from '@/components/AppLayout';

export const Shop: React.FC = () => {
  return (
    <AppLayout>
      <div className={styles.shop}>
        <Cards cardsList={products} />
      </div>
    </AppLayout>
  );
}
