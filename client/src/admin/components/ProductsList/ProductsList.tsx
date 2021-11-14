import { IProductFromDB } from '@/interfaces';
import React from 'react';
import styles from './ProductsList.module.scss';
import { ProductListItem } from '@/admin/components/ProductListItem';
import { Grid } from '@mui/material';

interface IProductsList {
  products: IProductFromDB[],
}

export const ProductsList: React.FC<IProductsList> = ({ products }: IProductsList) => {
  return (
    <div className={styles.products}>
      <Grid container spacing={2} columns={{ xs: 1, md: 2, lg: 3 }} className={styles.productsList}>
        {products && products.map((product: IProductFromDB) => {
          return (
            <Grid
              item
              xs={1}
              md={1}
              lg={1} 
              className={`${styles.productsListItem} productItem`}
              data-key={product._id}
              key={product._id} 
            >
              <ProductListItem
                product={product}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
