import { CategoriesList } from '@/admin/components/CategoriesList/CategoriesList';
import { AdminLayout } from '@/components/AppLayout';
import { Button } from '@/components/Button';
import { ICategory } from '@/interfaces';
import { RootState } from '@/store/reducers';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Categories.module.scss';
import { useForm } from 'react-hook-form';
import * as actions from '@/store/actions';

interface IFormInput {
  title: string,
}


export const Categories: React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getCategories());
  }, []);

  const { register, formState: { errors } } = useForm<IFormInput>();
  const categories: ICategory[] = useSelector((state: RootState) => state.categoryReducer.categories);
  console.log(categories);

  const onAddClick = () => {
    const catTitleInput: HTMLInputElement | null = document.querySelector('#title');
    const catTitle = catTitleInput?.value;
    // catTitle && dispatch(actions.)
  };

  return (
    <AdminLayout>
      <div>
        <h1>Categories</h1>
        <form className={styles.formAdd}>
          <input 
            className={styles.formAddInput} 
            {...register('title', { required: true, minLength: 2 })} 
            type="text" 
            placeholder="Category title"
          />
          <div className={styles.error}>{errors.title && "Title is required and must be at least 2 characters length"}</div>
          <Button btnText="Add category" onClick={onAddClick} />
        </form>
        <CategoriesList categories={categories} />
      </div>
    </AdminLayout>
  )
}
