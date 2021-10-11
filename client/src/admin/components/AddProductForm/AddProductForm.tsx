import React, { useState, ChangeEvent, useEffect, MouseEvent } from 'react';
import styles from './AddProductForm.module.scss';
import { useForm } from 'react-hook-form';
import { ICategoryFromDB, IProduct } from '@/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '@/store/actions';
import { RootState } from '@/store/reducers';
// import { Button } from '@/components/Button';

export const AddProductForm: React.FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, getValues, formState: { errors, isSubmitSuccessful } } = useForm<IProduct>();
  const categories = useSelector((state: RootState) => state.categoryReducer.categories);

  useEffect(() => {
    dispatch(actions.getCategories());
  }, []);

  const onAddSubmitClick = (data: IProduct) => {
    dispatch(actions.postProduct(data));
  };

  return (
    <>
    {isSubmitSuccessful
      ? <div className={styles.success}>Product successfully added</div>
      : <form className={styles.form} onSubmit={handleSubmit(onAddSubmitClick)}>
      <label htmlFor='title' className={styles.formLabel}>Title:</label>
      <input 
        className={styles.formInput} 
        {...register('title', { required: true, minLength: 2 })} 
        type="text" 
        placeholder="Title" 
        defaultValue={getValues('title')}
      />
      <div className={styles.error}>{errors.title && "Field is required and must be at least 2 characters length"}</div>
      <label htmlFor='image' className={styles.formLabel}>Image path:</label>
      <input 
        className={styles.formInput} 
        {...register('image', { required: false, pattern: /(\.png|\.jpg|\.jpeg)$/ })} 
        type="text" 
        placeholder="Image path (like assets/images/example.png)"
      />
      <div className={styles.error}>{errors.image && "It is allow to use only images in PNG, JPG and JPEG format"}</div>
      <label htmlFor='description' className={styles.formLabel}>Description:</label>
      <textarea 
        className={styles.formInput} 
        {...register('description', { required: true, minLength: 10 })} 
        placeholder="Description" 
        defaultValue={getValues('description')}
      />
      <div className={styles.error}>{errors.title && "Field is required and must be at least 10 characters length"}</div>
      <label htmlFor='categoryId' className={styles.formLabel}>Category:</label>
      <select 
        className={styles.formInput} 
        {...register('categoryId', { required: true})} 
        defaultValue={getValues('categoryId')}
      >
        {categories.map((category: ICategoryFromDB) => <option key={category._id} value={category._id}>{category.title}</option>)}
      </select>
      <div className={styles.error}>{errors.categoryId && "Field is required"}</div>
      <label htmlFor='amount' className={styles.formLabel}>Amount in 1 package:</label>
      <input 
        className={styles.formInput} 
        {...register('amount', { required: false, min: 1 })} 
        type="text" 
        placeholder="Amount" 
        defaultValue={getValues('amount')}
      />
      <div className={styles.error}>{errors.amount && "Field must be at least 1"}</div>
      <label htmlFor='size' className={styles.formLabel}>Size:</label>
      <input 
        className={styles.formInput} 
        {...register('size', { required: false, minLength: 1 })} 
        type="text" 
        placeholder="Size" 
        defaultValue={getValues('size')}
      />
      <div className={styles.error}>{errors.size && "Field must be at least 1 characters length"}</div>
      <label htmlFor='price' className={styles.formLabel}>Price:</label>
      <input 
        className={styles.formInput} 
        {...register('price', { required: true, min: 1 })} 
        type="text" 
        placeholder="Price" 
        defaultValue={getValues('price')}
      />
      <div className={styles.error}>{errors.price && "Field is required and must to be at least 1"}</div>
      <input type="submit" className={styles.btn} />
    </form>}
    </>
  );
};