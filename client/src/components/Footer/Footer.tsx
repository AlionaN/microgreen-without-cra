import React from 'react';
import { Logo } from '@/components/Logo';
import styles from './Footer.module.scss';
import { MdFacebook } from 'react-icons/md';
import { AiFillInstagram } from 'react-icons/ai';
import { IoLogoLinkedin } from 'react-icons/io';
import { FaTelegram } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { Routes } from '@/enums';
import { Grid } from '@mui/material';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Logo />
      <Grid container spacing={2} columns={{ xs: 1, sm: 2, lg: 4 }} className={styles.row}>
        <Grid item xs={1} sm={1} lg={1} className={styles.column}>
          <div className={styles.columnTitle}>We are in social networks</div>
          <div className={styles.socials}>
            <div className={styles.socialsItem}><MdFacebook /></div>
            <div className={styles.socialsItem}><AiFillInstagram /></div>
            <div className={styles.socialsItem}><IoLogoLinkedin /></div>
            <div className={styles.socialsItem}><FaTelegram /></div>
          </div>
        </Grid>
        <Grid item xs={1} sm={1} lg={1} className={styles.column}>
          <div className={styles.columnTitle}>Support</div>
          <div className={styles.columnItem}><NavLink to={Routes.Delivery}>Delivery</NavLink></div>
          <div className={styles.columnItem}><NavLink to={Routes.Payment}>Payment</NavLink></div>
          <div className={styles.columnItem}>Guarantee</div>
        </Grid>
        <Grid item xs={1} sm={1} lg={1} className={styles.column}>
          <div className={styles.columnTitle}>Company information</div>
          <div className={styles.columnItem}><NavLink to={Routes.AboutUs}>About us</NavLink></div>
          <div className={styles.columnItem}>Vacancies</div>
          <div className={styles.columnItem}><NavLink to={Routes.Contacts}>Contacts</NavLink></div>
        </Grid>
        <Grid item xs={1} sm={1} lg={1} className={styles.column}>
          <div className={styles.columnItem}>Terms & conditions</div>
          <div className={styles.columnItem}>Legal notice</div>
          <div className={styles.columnItem}>Privacy policy</div>
        </Grid>
      </Grid>
      <div className={styles.copyright}>All rights reserved. 2021</div>
    </footer>
  );
};
