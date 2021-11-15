import React from 'react';
import styles from './Payment.module.scss';
import { IMG_PATH } from '@/constants';
import { AppLayout } from '@/components/AppLayout';
import { Grid } from '@mui/material';

export const Payment: React.FC = () => {
  return (
    <AppLayout>
      <div className={styles.payment}>
        <div className={styles.paymentTitle}>Payment</div>
        <div className={styles.paymentVars}>
          <Grid container spacing={2} columns={{ xs: 1, md: 2 }}>
            <Grid item xs={1} md={1}>
              <div className={styles.paymentVarsItem}>
                <img src={`${IMG_PATH}pay-on-delivery.jpg`} className={styles.paymentVarsItemImg} alt="Pay on delivery" />
                <div className={styles.paymentVarsItemTitle}>Pay on Delivery</div>
                <div className={styles.paymentVarsItemDescr}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
              </div>
            </Grid>
            <Grid item xs={1} md={1}>
              <div className={styles.paymentVarsItem}>
                <img src={`${IMG_PATH}portmone.jpg`} className={styles.paymentVarsItemImg} alt="Portmone" />
                <div className={styles.paymentVarsItemTitle}>Portmone</div>
                <div className={styles.paymentVarsItemDescr}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
              </div>
            </Grid>
            <Grid item xs={1} md={1}>
              <div className={styles.paymentVarsItem}>
                <img src={`${IMG_PATH}privat24.png`} className={styles.paymentVarsItemImg} alt="Privat24" />
                <div className={styles.paymentVarsItemTitle}>Privat24</div>
                <div className={styles.paymentVarsItemDescr}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </AppLayout>
  );
};
