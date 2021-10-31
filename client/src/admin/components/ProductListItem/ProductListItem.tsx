import { IProductFromDB, IProduct, ICategoryFromDB } from '@/interfaces';
import React, { useState, ChangeEvent, useEffect, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import styles from './ProductListItem.module.scss';
import { useForm } from 'react-hook-form';
import * as actions from '@/store/actions';
import defaultImg from '@/assets/images/default.jpg';
import { Button } from '@/components/Button';
import { FiCheck } from 'react-icons/fi';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { compareObjects } from '@/helpers';

interface IProps {
  product: IProductFromDB,
}

export const ProductListItem: React.FC<IProps> = ({ product }: IProps) => {

  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categoryReducer.categories);
  const category = categories.filter((item: ICategoryFromDB) =>  item._id === product.categoryId);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { image, title, categoryId, amount, size, price, description } = product;
  const { register, formState: { errors } } = useForm<IProduct>();

  const [productInfo, setProductInfo] = useState<IProduct>({
    image,
    title,
    categoryId,
    size: size || '',
    amount: amount || 0,
    price,
    description
  });

  useEffect(() => {
    dispatch(actions.getCategories());
  }, []);

  const onInputChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    setProductInfo({
      ...productInfo,
      [target.name]: target.value
    });
  };

  const onEditModeClick = () => {
    setEditMode(true);
  };

  const onEditClick = (e: MouseEvent<HTMLButtonElement | JSX.Element | MouseEvent>): void => {
    e.preventDefault();
    if(compareObjects(product, productInfo)) {
      setEditMode(false);
      return;
    }
    dispatch(actions.editProduct(product._id, productInfo));
    setEditMode(false);
  };

  const onDeleteClick = (e: MouseEvent<HTMLButtonElement | JSX.Element | MouseEvent>): void => {
    e.preventDefault();
    dispatch(actions.deleteProduct(product._id));
  };

  return (
    <div className={styles.card} data-edit={editMode && 'cardEditMode'}>
      <div className={styles.cardImgContainer}>
        <img className={styles.cardImg} src={product.image || defaultImg} alt={product.title} />
        {editMode
          ? <>
            <label htmlFor="image" className={styles.cardLabel}>Choose another image</label>
            <input 
              className={styles.cardInput}
              {...register('image', { required: false })}
              onChange={(e) => onInputChange(e)}
              type="text"
              value={productInfo.image}
            />
            </>
          : null}      
        <div className={styles.error}>{errors.image && "Field is required"}</div>
        
      </div>
      <label htmlFor='title' className={styles.cardLabel}>Title</label>
      <input 
        className={styles.cardInput} 
        {...register('title', { required: true, minLength: 2 })} 
        type="text" 
        placeholder="Title" 
        onChange={(e) => onInputChange(e)}
        value={productInfo.title}
        readOnly={!editMode}
      />
      <div className={styles.error}>{errors.title && "Field is required and minimal length is 2 characters"}</div>
      <label htmlFor='description' className={styles.cardLabel}>Description</label>
      <textarea
        className={styles.cardTextarea}
        {...register('description', { required: true, minLength: 10, maxLength: 250 })}
        onChange={(e) => onInputChange(e)}
        value={productInfo.description}
        readOnly={!editMode}
      />
      <div className={styles.error}>{errors.description && "Field is required and length might be between 10 and 250 characters"}</div>
      <label htmlFor='categoryId' className={styles.cardLabel}>Category</label>
      {editMode 
        ? <select
            value={productInfo.categoryId}
            {...register('categoryId')}
            className={styles.cardSelect}
            onChange={onInputChange}
          >
          {categories.map((cat: ICategoryFromDB) => 
              <option key={cat._id} value={cat._id}>{cat.title}</option>
            )
          }
          </select>
        : <input
            type="text"
            value={category[0].title}
            readOnly={true}
            className={styles.cardInput}
          />
      }
      <label htmlFor='size' className={styles.cardLabel}>Product size</label>
      <input
        className={styles.cardInput}
        {...register('size', { required: false, minLength: 1 })}
        onChange={(e) => onInputChange(e)}
        value={productInfo.size}
        readOnly={!editMode}
      />
      <div className={styles.error}>{errors.size && "Field is required and minimal length is 1 character"}</div>
      <label htmlFor='amount' className={styles.cardLabel}>Amount in 1 package</label>
      <input
        className={styles.cardInput}
        {...register('amount', { required: false, min: 1 })}
        onChange={(e) => onInputChange(e)}
        value={productInfo.amount}
        readOnly={!editMode}
      />
      <div className={styles.error}>{errors.amount && "Field is required and minimal length is 1 character"}</div>
      <label htmlFor='price' className={styles.cardLabel}>Price</label>
      <input 
        className={styles.cardInput} 
        {...register('price', { required: true, min: 1 })} 
        type="text" 
        placeholder="Price" 
        onChange={(e) => onInputChange(e)}
        value={productInfo.price}
        readOnly={!editMode}
      />
      <div className={styles.error}>{errors.price && "Field is required and minimal length is 2 characters"}</div>
      <div className={styles.btns}>
        {editMode
          ? <Button btnText={<FiCheck />} onClick={onEditClick} />
          : <Button btnText={<MdModeEdit />} onClick={onEditModeClick} />
        }
        <Button btnText={<MdDelete />} onClick={onDeleteClick} />
      </div>
    </div>
  );
};
