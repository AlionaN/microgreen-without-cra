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
import { Sorting } from '@/components/Sorting';
import { Grid } from '@mui/material';

interface IFormInput {
  title: string,
};


export const Categories: React.FC = () => {
  const dispatch = useDispatch();

  const [categoryInputs, setCategoryInputs] = useState({
    title: ''
  });

  const { register, formState: { errors } } = useForm<IFormInput>();
  const categories: ICategoryFromDB[] = useSelector((state: RootState) => state.categoryReducer.categories);
  const getLoadingStatus: boolean = useSelector((state: RootState) => state.categoryReducer.getCategoriesStatus.loading);
  const postLoadingStatus: boolean = useSelector((state: RootState) => state.categoryReducer.postCategoryStatus.loading);
  const deleteLoadingStatus: boolean = useSelector((state: RootState) => state.categoryReducer.deleteCategoryStatus.loading);
  const editLoadingStatus: boolean = useSelector((state: RootState) => state.categoryReducer.editCategoryStatus.loading);
  const statuses = [getLoadingStatus, postLoadingStatus, deleteLoadingStatus, editLoadingStatus];
  const isLoading = statuses.some((item) => item === true);

  const sortOptions = [
    {title: 'Title (A - Z)', value: 'sortField=title&sortMethod=asc'},
    {title: 'Title (Z - A)', value: 'sortField=title&sortMethod=desc'},
  ];

  useEffect(() => {
    dispatch(actions.getCategories());
  }, []);

  const onAddClick = (e: MouseEvent<HTMLButtonElement | JSX.Element | MouseEvent>): void => {
    e.preventDefault();
    categoryInputs && dispatch(actions.postCategory(categoryInputs as ICategory));
    
    setCategoryInputs({
      ...categoryInputs,
      title: ''
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
      <Grid item xs={12}><h1 className={styles.title}>Categories</h1></Grid>
      <Grid item xs={12}>
        <form className={styles.formAdd}>
          <p className={styles.formAddDescription}>To add category, just write title below and click Add Category button</p>
          <div>
            <input 
              className={`${styles.formAddInput} addInput`} 
              {...register('title', { required: true, minLength: 2 })} 
              type="text" 
              placeholder="Category title"
              defaultValue={categoryInputs.title}
              onChange={(e) => onChange(e)}
            />
            <div className={styles.error}>{errors.title && "Title is required and must be at least 2 characters length"}</div>
          </div>
          <Button btnText="Add category" onClick={(e) => onAddClick(e)} classes={`${styles.formAddBtn}`} />
        </form>
      </Grid>
      <Grid item xs={12} md={2} alignSelf='stretch'>
        <div className={styles.panel}>
          <Sorting
            options={sortOptions}
            sortObject='category'
            classes={styles.categoriesSort}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={10}>
        {isLoading
          ? <Loader />
          : !categories || categories?.length !== 0
            ? <CategoriesList 
                categories={categories}
                classes={styles.categories}
              />
            : <div className={styles.message}>There are no categories</div>
        }
      </Grid>
    </AdminLayout>
  );
};
