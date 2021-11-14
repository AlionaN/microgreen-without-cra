import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './Home.module.scss';
import { Cards } from '@/components/Cards';
import { Hero } from '@/components/Hero';
import { IProductFromDB } from '@/interfaces/IProductFromDB';
import { IMG_PATH } from '@/constants';
import { AppLayout } from '@/components/AppLayout';
import { RootState } from '@/store/reducers';
import * as actions from '@/store/actions';
import { Grid } from '@mui/material';

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.productReducer.products);
  const filters = useSelector((state: RootState) => state.productReducer.filters);
  const sorting = useSelector((state: RootState) => state.productReducer.sorting);


  useEffect(() => {
    dispatch(actions.getProducts(filters, sorting, { page: 0, limit: 15 }));
  }, []);

  const getCertainAmountCards = (amount: number): IProductFromDB[] => {
    return products.filter((item: IProductFromDB, index: number) => index < amount && item);
  };

  return (
    <AppLayout>
      <Hero />
      <div className={styles.about}>
        <Grid container spacing={2} columns={{ xs: 1, md: 2 }}>
          <Grid item xs={1} md={1}>
            <img src={`${IMG_PATH}about.jpg`} className={styles.aboutImg} alt="About microgreen" />
          </Grid>
          <Grid item xs={1} md={1} className={styles.aboutInfo}>
            <div className={styles.aboutInfoTitle}>Microgreen is ...</div>
            <div className={styles.aboutInfoText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus ultricies tristique nulla. Tristique senectus et netus et malesuada. Morbi tristique senectus et netus. Placerat in egestas erat imperdiet. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Faucibus a pellentesque sit amet porttitor eget. Est ultricies integer quis auctor elit sed vulputate mi. Diam maecenas sed enim ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus ultricies tristique nulla. Tristique senectus et netus et malesuada. Morbi tristique senectus et netus. Placerat in egestas erat imperdiet. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Faucibus a pellentesque sit amet porttitor eget. Est ultricies integer quis auctor elit sed vulputate mi. Diam maecenas sed enim ut.
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={styles.products}>
        <div className={styles.productsTitle}>Products</div>
        <Cards cardsList={getCertainAmountCards(4)} />
        <NavLink to="/shop" className={styles.toShop}>Go To Shop</NavLink>
      </div>
    </AppLayout>
  );
};
