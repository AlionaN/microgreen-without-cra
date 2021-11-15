import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Contacts.module.scss';
import { IMG_PATH } from '@/constants';
import { Button } from '@/components/Button';
import { AppLayout } from '@/components/AppLayout';
import { Grid } from '@mui/material';

export const Contacts: React.FC = () => {

  const onSendClick = () => {

  };

  return (
    <AppLayout>
      <div className={styles.contacts}>
        <Grid container spacing={2} columns={{ xs: 1, md: 2 }}>
          <Grid item sx={{ display: { xs: 'none', md: 'inline' } }} md={1}><img className={styles.contactsImage} src={`${IMG_PATH}contacts.jpg`} alt="Contacts" /></Grid>
          <Grid item xs={1} md={1}>
            <div className={styles.contactsInfo}>
              <div className={styles.contactsInfoTitle}>Contact us</div>
              <div className={styles.contactsInfoWrap}>
                <Grid container spacing={2} columns={{ xs: 1, lg: 3 }}>
                  <Grid item xs={1} lg={1}><div className={styles.contactsInfoWrapAddress}>Kyiv, Lobanovskogo st., 8</div></Grid>
                  <Grid item xs={1} lg={1}><div className={styles.contactsInfoWrapEmail}><Link to="mailto:info@microgreen.com">info@microgreen.com</Link></div></Grid>
                  <Grid item xs={1} lg={1}><div className={styles.contactsInfoWrapPhone}><Link to="tel:+380639000343">+380639000343</Link></div></Grid>
                </Grid>
              </div>
              <form className={styles.form}>
                <div className={styles.formDescription}>If you have any questions or suggestions, send a message to us</div>
                <input type="text" className={styles.formInput} placeholder="Name" />
                <input type="email" className={styles.formInput} placeholder="Email" />
                <textarea className={styles.formTextarea} placeholder="Message" />
                <Button btnText="Send" classes={styles.formBtn} onClick={onSendClick} />
              </form>
              <div className={styles.contactsFollow}>
                <div className={styles.contactsFollowTitle}>Follow us</div>
                <div className={styles.contactsFollowSocials}>
                  <Link className={styles.contactsFollowSocialsItem} to="https://www.facebook.com/"><img src={`${IMG_PATH}facebook.png`} alt="Facebook" /></Link>
                  <Link className={styles.contactsFollowSocialsItem} to="https://www.instagram.com/"><img src={`${IMG_PATH}instagram.png`} alt="Instagram" /></Link>
                  <Link className={styles.contactsFollowSocialsItem} to="https://www.linkedin.com/"><img src={`${IMG_PATH}linkedin.png`} alt="LinkedIn" /></Link>
                  <Link className={styles.contactsFollowSocialsItem} to="https://twitter.com/?lang=en"><img src={`${IMG_PATH}twitter.png`} alt="Twitter" /></Link>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </AppLayout>
  );
};
