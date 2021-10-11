import { IProductFromDB } from '@/interfaces';
import React from 'react';
import styles from './ProductsList.module.scss';
import { ProductListItem } from '@/admin/components/ProductListItem';

interface IProductsList {
  products: IProductFromDB[],
}

export const ProductsList: React.FC<IProductsList> = ({ products }: IProductsList) => {
  return (
    <div className={styles.products}>
      <ul className={styles.productsList}>
        {products && products.map((product: IProductFromDB) => {
          return (
            <li 
              className={`${styles.productsListItem} productItem`}
              data-key={product._id}
              key={product._id} 
            >
              <ProductListItem
                product={product}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
