import { CategoriesList } from '@/admin/components/CategoriesList';
import { AdminLayout } from '@/components/AppLayout';
import { Button } from '@/components/Button';
import { ICategory, ICategoryFromDB } from '@/interfaces';
import { RootState } from '@/store/reducers';
import React, { useEffect, MouseEvent, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Categories.module.scss';
import { useForm } from 'react-hook-form';
import * as actions from '@/store/actions';
import { Loader } from '@/components/Loader';

interface IFormInput {
  title: string,
}


export const Categories: React.FC = () => {

  const [categoryInputs, setCategoryInputs] = useState({});
  const { register, formState: { errors } } = useForm<IFormInput>();
  const categories: ICategoryFromDB[] = useSelector((state: RootState) => state.categoryReducer.categories);
  const getLoadingStatus: boolean = useSelector((state: RootState) => state.categoryReducer.getCategoriesStatus.loading);
  const postLoadingStatus: boolean = useSelector((state: RootState) => state.categoryReducer.postCategoryStatus.loading);
  const deleteLoadingStatus: boolean = useSelector((state: RootState) => state.categoryReducer.deleteCategoryStatus.loading);
  const editLoadingStatus: boolean = useSelector((state: RootState) => state.categoryReducer.editCategoryStatus.loading);

  const statuses = [getLoadingStatus, postLoadingStatus, deleteLoadingStatus, editLoadingStatus];
  const isLoading = statuses.some((item) => item === true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getCategories());
  }, []);

  const onAddClick = (e: MouseEvent<HTMLButtonElement | JSX.Element | MouseEvent>): void => {
    e.preventDefault();
    categoryInputs && dispatch(actions.postCategory(categoryInputs as ICategory));

    Array.from(document.querySelectorAll('.addInput')).forEach((item) => {
      const inputItem = item as HTMLInputElement;
      inputItem.value = '';
    });
  };

  const onChange = (e: ChangeEvent): void => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;

    setCategoryInputs({
      ...categoryInputs,
      [target.name]: target.value,
    });
  };

  return (
    <AdminLayout>
      <div>
        <h1>Categories</h1>
        <form className={styles.formAdd}>
          <div>
            <input 
              className={`${styles.formAddInput} addInput`} 
              {...register('title', { required: true, minLength: 2 })} 
              type="text" 
              placeholder="Category title"
              onChange={(e) => onChange(e)}
            />
            <div className={styles.error}>{errors.title && "Title is required and must be at least 2 characters length"}</div>
          </div>
          <Button btnText="Add category" onClick={onAddClick} classes={styles.formAddBtn} />
        </form>
        {isLoading
          ? <Loader />
          : <CategoriesList 
              categories={categories}
            />}
      </div>
    </AdminLayout>
  )
}
