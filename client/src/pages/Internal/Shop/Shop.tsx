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
import { Loader } from '@/components/Loader';
import { Grid } from '@mui/material';

export const Shop: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.productReducer.products);
  const productsQuantity = useSelector((state: RootState) => state.productReducer.productsQuantity);
  const getProductsStatus = useSelector((state: RootState) => state.productReducer.getProductsStatus);
  const filters = useSelector((state: RootState) => state.productReducer.filters);
  const sorting = useSelector((state: RootState) => state.productReducer.sorting);
  const sortOptions = [
    {title: 'Title (A - Z)', value: 'sortField=title&sortMethod=asc'},
    {title: 'Title (Z - A)', value: 'sortField=title&sortMethod=desc'},
    {title: 'Price (Low to High)', value: 'sortField=price&sortMethod=asc'},
    {title: 'Price (High to Low)', value: 'sortField=price&sortMethod=desc'},
  ];

  useEffect(() => {
    dispatch(actions.getProducts(filters, sorting, { page: 0, limit: 8 }));
  }, []);

  return (
    <AppLayout>
      <div className={styles.panel}>
        <Grid container columns={{ xs: 1, sm: 3 }}>
          <Grid item xs={1} sm={2}>
            <Filters
              classes={styles.panelFilters}
            />
          </Grid>
          <Grid item xs={1} sm={1} className={styles.sort}>
            <Sorting
              options={sortOptions}
              sortObject='product'
              classes={styles.panelSorting}
            />
          </Grid>
        </Grid>
      </div>
      <div className={styles.shop}>
        {getProductsStatus.loading
          ? <Loader />
          : !products || products?.length !== 0
            ? <Cards cardsList={products} />
            : <div className={styles.message}>There are no products yet</div>
        }
      </div>
      {products.length > 0 && <Pagination
        pagesQuantity={Math.ceil(productsQuantity / 8)}
        productsPerPage={8}
        classes={styles.shopPagination}
      />}
    </AppLayout>
  );
}
