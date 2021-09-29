import { Button } from '@/components/Button';
import { ICategoryFromDB } from '@/interfaces';
import React, { MouseEvent } from 'react';
import styles from './CategoriesList.module.scss';
import { MdModeEdit, MdDelete } from 'react-icons/md';

interface ICategoriesList {
  categories: ICategoryFromDB[],
  onEditClick: (e: MouseEvent<HTMLButtonElement | JSX.Element | MouseEvent>) => void,
  onDeleteClick: (e: MouseEvent<HTMLButtonElement | JSX.Element | MouseEvent>) => void,
}

export const CategoriesList: React.FC<ICategoriesList> = ({ categories, onEditClick, onDeleteClick }: ICategoriesList) => {

  return (
    <div className={styles.categories}>
      <ul className={styles.categoriesList}>
        {categories && categories.map((cat: ICategoryFromDB) => {
          return (
            <li 
              className={`${styles.categoriesListItem} categoryItem`}
              data-key={cat._id}
              key={cat._id} 
            >
              {cat.title}
              <div className={styles.btns}>
                <Button btnText={<MdModeEdit/>} onClick={(e) => onEditClick(e)} />
                <Button btnText={<MdDelete/>} onClick={(e) => onDeleteClick(e)} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
