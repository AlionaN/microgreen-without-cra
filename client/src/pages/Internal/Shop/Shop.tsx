import React, { useEffect } from 'react';
import styles from './Shop.module.scss';
import { Cards } from '@/components/Cards';
import { AppLayout } from '@/components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import * as actions from '@/store/actions';
import { Filters } from '@/components/Filters';
import { Sorting } from '@/components/Sorting';
import { Pagination } from '@/components/Pagination';
import { PRODUCTS_PER_PAGE } from '@/constants';
import { Loader } from '@/components/Loader';

export const Shop: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.productReducer.products);
  const productsQuantity = useSelector((state: RootState) => state.productReducer.productsQuantity);
  const getProductsStatus = useSelector((state: RootState) => state.productReducer.getProductsStatus);
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
        {getProductsStatus.loading
          ? <Loader />
          : !products || products?.length !== 0
            ? <Cards cardsList={products} />
            : <div className={styles.message}>There are no products yet</div>
        }
      </div>
      <Pagination pagesQuantity={Math.ceil(productsQuantity / PRODUCTS_PER_PAGE)} />
    </AppLayout>
  );
}
