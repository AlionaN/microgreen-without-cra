import React from 'react';
import styles from './AboutUs.module.scss';
import { IMG_PATH } from '@/constants';
import { AppLayout } from '@/components/AppLayout';
import { Grid } from '@mui/material';

export const AboutUs: React.FC = () => {
  return (
    <AppLayout>
      <div className={styles.aboutUs}>
        <Grid container spacing={2} columns={{ xs: 1, md: 2 }} className={styles.team}>
          <Grid item xs={1} md={1} className={styles.teamInfo}>
            <div className={styles.teamInfoTitle}>Our team</div>
            <div className={styles.teamInfoText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus ultricies tristique nulla. Tristique senectus et netus et malesuada. Morbi tristique senectus et netus. Placerat in egestas erat imperdiet. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Faucibus a pellentesque sit amet porttitor eget. Est ultricies integer quis auctor elit sed vulputate mi. Diam maecenas sed enim ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus ultricies tristique nulla. Tristique senectus et netus et malesuada. Morbi tristique senectus et netus. Placerat in egestas erat imperdiet. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Faucibus a pellentesque sit amet porttitor eget. Est ultricies integer quis auctor elit sed vulputate mi. Diam maecenas sed enim ut.</div>
          </Grid>
          <Grid item xs={1} md={1}><img src={`${IMG_PATH}team.jpg`} className={styles.teamImage} alt="Team" /></Grid>
        </Grid>
        <div className={styles.history}>
          <div className={styles.historyTitle}>History</div>
          <Grid container spacing={2} columns={{ xs: 1, md: 3 }} className={styles.historySteps}>
            <Grid item xs={1} md={1}>
              <div className={styles.historyStepsItem}>
                <div className={styles.historyStepsItemYear}>2001</div>
                <div className={styles.historyStepsItemDescr}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
              </div>
            </Grid>
            <Grid item xs={1} md={1}>
              <div className={styles.historyStepsItem}>
                <div className={styles.historyStepsItemYear}>2005</div>
                <div className={styles.historyStepsItemDescr}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
              </div>
            </Grid>
            <Grid item xs={1} md={1}>
              <div className={styles.historyStepsItem}>
                <div className={styles.historyStepsItemYear}>2021</div>
                <div className={styles.historyStepsItemDescr}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </AppLayout>
  );
};
