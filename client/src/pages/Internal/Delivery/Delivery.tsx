import React from 'react';
import styles from './Delivery.module.scss';
import { IMG_PATH } from '@/constants';
import { AppLayout } from '@/components/AppLayout';
import { Grid } from '@mui/material';

export const Delivery: React.FC = () => {
  return (
    <AppLayout>
      <div className={styles.delivery}>
        <div className={styles.deliveryTitle}>Delivery</div>
        <div className={styles.deliveryVars}>
          <Grid container spacing={2} columns={{ xs: 1, md: 2 }}>
            <Grid item xs={1} md={1}>
              <div className={styles.deliveryVarsItem}>
                <img className={styles.deliveryVarsItemImg} src={`${IMG_PATH}meest.png`} alt="Meest" />
                <div className={styles.deliveryVarsItemTitle}>Meest Express</div>
                <div className={styles.deliveryVarsItemText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </div>
            </Grid>
            <Grid item xs={1} md={1}>
              <div className={styles.deliveryVarsItem}>
                <img className={styles.deliveryVarsItemImg} src={`${IMG_PATH}np.jpg`} alt="Nova Poshta" />
                <div className={styles.deliveryVarsItemTitle}>Nova Poshta</div>
                <div className={styles.deliveryVarsItemText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
              </div>
            </Grid>
            <Grid item xs={1} md={1}>
              <div className={styles.deliveryVarsItem}>
                <img className={styles.deliveryVarsItemImg} src={`${IMG_PATH}ukrposhta.jpg`} alt="Ukrposhta" />
                <div className={styles.deliveryVarsItemTitle}>Ukrposhta</div>
                <div className={styles.deliveryVarsItemText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
              </div>
            </Grid>
            <Grid item xs={1} md={1}>
              <div className={styles.deliveryVarsItem}>
                <img className={styles.deliveryVarsItemImg} src={`${IMG_PATH}self-pickup.jpg`} alt="Selt Pickup" />
                <div className={styles.deliveryVarsItemTitle}>Self Pickup</div>
                <div className={styles.deliveryVarsItemText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </AppLayout>
  );
}
