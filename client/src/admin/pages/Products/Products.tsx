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

export const Products: React.FC = () => {
  const dispatch = useDispatch();
  const products: IProductFromDB[] = useSelector((state: RootState) => state.productReducer.products);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const getLoadingStatus: boolean = useSelector((state: RootState) => state.categoryReducer.getCategoriesStatus.loading);
  const deleteLoadingStatus: boolean = useSelector((state: RootState) => state.categoryReducer.deleteCategoryStatus.loading);
  const editLoadingStatus: boolean = useSelector((state: RootState) => state.categoryReducer.editCategoryStatus.loading);

  const statuses = [getLoadingStatus, deleteLoadingStatus, editLoadingStatus];
  const isLoading = statuses.some((item) => item === true);

  useEffect(() => {
    dispatch(actions.getProducts());
  }, []);

  const onAddClick = (): void => {
    setIsAddModalOpen(true);
  };

  const onAddModalClose = (): void => {
    setIsAddModalOpen(false);
  };

  return (
    <AdminLayout>
      <div>
        <h1>Products</h1>
        <Button
          btnText="Add new product"
          onClick={onAddClick}
        />
        <ProductsList
          products={products}
        />
        {/* {isLoading
          ? <Loader />
          : <ProductsList
              products={products}
            />
        } */}
      </div>
      <Modal
        isModalOpen={isAddModalOpen}
        onCloseModal={onAddModalClose}
      >
        <AddProductForm />
      </Modal>
    </AdminLayout>
  );
};
