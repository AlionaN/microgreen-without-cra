import { ICategoryFromDB } from '@/interfaces';
import React from 'react';
import { CategoriesListItem } from '@/admin/components/CategoriesListItem';
import styles from './CategoriesList.module.scss';

interface ICategoriesList {
  categories: ICategoryFromDB[],
  classes?: string,
};

export const CategoriesList: React.FC<ICategoriesList> = ({ categories, classes }: ICategoriesList) => {
  return (
    <div className={`${styles.categories} ${classes}`}>
      <ul className={styles.categoriesList}>
        {categories && categories.map((category: ICategoryFromDB) => 
          <CategoriesListItem
            key={category._id}
            category={category}   
          />
        )}
      </ul>
    </div>
  );
};
