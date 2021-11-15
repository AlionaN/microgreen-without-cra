import { AdminLayout } from '@/components/AppLayout';
import { RootState } from '@/store/reducers';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '@/store/actions';
import { ProductsList } from '@/admin/components/ProductsList';
import { IProductFromDB } from '@/interfaces';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Loader } from '@/components/Loader';
import { AddProductForm } from '@/admin/components/AddProductForm';
import { Pagination } from '@/components/Pagination';
import styles from './Products.module.scss';
import { Grid } from '@mui/material';

export const Products: React.FC = () => {
  const dispatch = useDispatch();
  const products: IProductFromDB[] = useSelector((state: RootState) => state.productReducer.products);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const getLoadingStatus: boolean = useSelector((state: RootState) => state.productReducer.getProductsStatus.loading);
  const deleteLoadingStatus: boolean = useSelector((state: RootState) => state.productReducer.deleteProductStatus.loading);
  const productsQuantity = useSelector((state: RootState) => state.productReducer.productsQuantity);
  const filters = useSelector((state: RootState) => state.productReducer.filters);
  const sorting = useSelector((state: RootState) => state.productReducer.sorting);

  const statuses = [getLoadingStatus, deleteLoadingStatus];
  const isLoading = statuses.some((item) => item === true);

  useEffect(() => {
    dispatch(actions.getProducts(filters, sorting, { page: 0, limit: 6 }));
  }, []);

  const onAddClick = (): void => {
    setIsAddModalOpen(true);
  };

  const onAddModalClose = (): void => {
    setIsAddModalOpen(false);
    dispatch(actions.clearPostProductStatus());
  };

  return (
    <AdminLayout>
      <Grid item xs={12} md={12} justifyContent='space-between' alignItems='center' display='flex'>
        <h1 className={styles.title}>Products</h1>
        <div className={styles.addProductBtnWrap}>
          <Button
            btnText="Add new product"
            onClick={onAddClick}
            classes={styles.addProductBtn}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={12}>
        {isLoading
          ? <Loader />
          : !products || products?.length !== 0
            ? <ProductsList
                products={products}
              />
            : <div className={styles.message}>There are no products yet</div>
        }
      </Grid>
      <Grid item xs={12} md={12}>
        <Pagination 
          pagesQuantity={Math.ceil(productsQuantity / 6)}
          productsPerPage={6}
          classes={styles.productsPagination}
        />
      </Grid>
      <Modal
        isModalOpen={isAddModalOpen}
        onCloseModal={onAddModalClose}
      >
        <AddProductForm />
      </Modal>
    </AdminLayout>
  );
};
