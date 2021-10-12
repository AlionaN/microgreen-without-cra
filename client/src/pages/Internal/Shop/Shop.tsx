import React, { useEffect } from 'react';
import styles from './Shop.module.scss';
import { Cards } from '@/components/Cards';
import { AppLayout } from '@/components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import * as actions from '@/store/actions';
import { Filters } from '@/admin/components/Filters';
import { Sorting } from '@/admin/components/Sorting';

export const Shop: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.productReducer.products);
  const sortOptions = [
    {title: 'Title (A - Z)', value: 'sortField=title&sortMethod=asc'},
    {title: 'Title (Z - A)', value: 'sortField=title&sortMethod=desc'},
    {title: 'Price (Low to High)', value: 'sortField=price&sortMethod=asc'},
    {title: 'Price (High to Low)', value: 'sortField=price&sortMethod=desc'},
  ];

  useEffect(() => {
    dispatch(actions.getProducts());
  }, []);

  return (
    <AppLayout>
      <Filters />
      <Sorting
        options={sortOptions}
        sortObject='product'
      />
      <div className={styles.shop}>
        <Cards cardsList={products} />
      </div>
    </AppLayout>
  );
}
