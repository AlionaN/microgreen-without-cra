import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Hero.module.scss';
import { IMG_PATH } from '@/constants';
import { Grid } from '@mui/material';

export const Hero: React.FC = () => {
  const img = `${IMG_PATH}hero.jpg`;

  return (
    <Grid container spacing={2} columns={{ xs: 1, md: 2 }} alignItems='center' className={styles.hero} style={{ backgroundImage: `url(${img})` }}>
      <Grid item xs={1} md={1}></Grid>
      <Grid item xs={1} md={1}><div className={`${styles.heroText} ${styles.heroTextRight}`}>Micro</div></Grid>

      <Grid item xs={1} md={1}><div className={`${styles.heroText} ${styles.heroTextLeft}`}>Green</div></Grid>
      <Grid item xs={1} md={1}></Grid>

      <Grid item xs={1} md={2}>
        <div className={styles.toShop}>
          <div className={styles.toShopText}>Alive food for you</div>
          <NavLink to="/shop" className={styles.btn}>To Shop</NavLink>
        </div>
      </Grid>
    </Grid>
  );
};
