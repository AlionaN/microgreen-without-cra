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

export const Products: React.FC = () => {
  const dispatch = useDispatch();
  const products: IProductFromDB[] = useSelector((state: RootState) => state.productReducer.products);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const getLoadingStatus: boolean = useSelector((state: RootState) => state.productReducer.getProductsStatus.loading);
  const deleteLoadingStatus: boolean = useSelector((state: RootState) => state.productReducer.deleteProductStatus.loading);
  const productsQuantity = useSelector((state: RootState) => state.productReducer.productsQuantity);

  const statuses = [getLoadingStatus, deleteLoadingStatus];
  const isLoading = statuses.some((item) => item === true);

  useEffect(() => {
    dispatch(actions.getProducts());
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
      <h1 className={styles.title}>Products</h1>
      <div className={styles.addProductBtnWrap}>
        <Button
          btnText="Add new product"
          onClick={onAddClick}
          classes={styles.addProductBtn}
        />
      </div>
      {isLoading
        ? <Loader />
        : !products || products?.length !== 0
          ? <ProductsList
              products={products}
            />
          : <div className={styles.message}>There are no products yet</div>
      }
      <Pagination 
        pagesQuantity={Math.ceil(productsQuantity / 6)}
        productsPerPage={6}
        classes={styles.productsPagination}
      />
      <Modal
        isModalOpen={isAddModalOpen}
        onCloseModal={onAddModalClose}
      >
        <AddProductForm />
      </Modal>
    </AdminLayout>
  );
};
