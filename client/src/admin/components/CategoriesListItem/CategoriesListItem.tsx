import { ICategoryFromDB, ICategory } from '@/interfaces';
import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import styles from './CategoriesListItem.module.scss';
import * as actions from '@/store/actions';
import { Button } from '@/components/Button';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { FiCheck } from 'react-icons/fi';


interface IProps {
  category: ICategoryFromDB
}

export const CategoriesListItem: React.FC<IProps> = ({ category }: IProps) => {
  const dispatch = useDispatch();
  const [categoryInfo, setCategoryInfo] = useState<ICategory>({
    title: category.title,
  });
  const [editMode, setEditMode] = useState<boolean>(false); 

  const onInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setCategoryInfo({
      ...categoryInfo,
      [target.name]: target.value
    });
  };

  const onEditModeClick = () => {
    setEditMode(true);
  };

  const onEditClick = (id: string) => {
    if (category.title === categoryInfo.title) {
      setEditMode(false);
      return;
    }
    dispatch(actions.editCategory(id, categoryInfo));
  };

  const onDeleteClick = (id: string) => {
    dispatch(actions.deleteCategory(id));
  };

  return (
    <li 
      className={`${styles.categoriesListItem} categoryItem`}
      data-key={category._id}
      key={category._id} 
    >
      {editMode
        ? <input 
            type="text"
            name="title"
            value={category.title}
            onChange={(e) => onInputChange(e)}
            className='addInput'
          />
        : category.title}
      <div className={styles.btns}>
        {editMode
          ? <Button btnText={<FiCheck />} onClick={() => onEditClick(category._id)} />
          : <Button btnText={<MdModeEdit />} onClick={onEditModeClick} />
        }
        <Button btnText={<MdDelete />} onClick={() => onDeleteClick(category._id)} />
      </div>
    </li>
  );
}
