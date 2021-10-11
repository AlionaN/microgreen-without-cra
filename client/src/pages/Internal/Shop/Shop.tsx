import React, { useEffect } from 'react';
import styles from './Shop.module.scss';
import { Cards } from '@/components/Cards';
import { AppLayout } from '@/components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import * as actions from '@/store/actions';

export const Shop: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.productReducer.products);

  useEffect(() => {
    dispatch(actions.getProducts());
  }, []);

  return (
    <AppLayout>
      <div className={styles.shop}>
        <Cards cardsList={products} />
      </div>
    </AppLayout>
  );
}
