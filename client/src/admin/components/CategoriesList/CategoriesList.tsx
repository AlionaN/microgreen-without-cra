import { Button } from '@/components/Button';
import { ICategory } from '@/interfaces';
import React from 'react';
import styles from './CategoriesList.module.scss';
import { MdModeEdit, MdDelete } from 'react-icons/md';

interface ICategoriesList {
  categories: ICategory[],
}

export const CategoriesList: React.FC<ICategoriesList> = ({ categories }: ICategoriesList) => {

  const onEditClick = (id: string): void => {

  }

  const onDeleteClick = (id: string): void => {
    
  }

  return (
    <div className={styles.categories}>
      <ul className={styles.categoriesList}>
        {categories?.map((cat: ICategory) => {
          return (
            <li 
              className={styles.categoriesListItem}
              key={cat._id} 
            >
              {cat.title}
              <Button btnText={<MdModeEdit/>} onClick={() => onEditClick(cat._id)} />
              <Button btnText={<MdDelete/>} onClick={() => onDeleteClick(cat._id)} />
            </li>
          );
        })}
      </ul>
    </div>
  )
}
