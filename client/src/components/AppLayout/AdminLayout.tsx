import React from 'react';
import { AdminHeader } from '@/admin/components/Header';
import { AdminFooter } from '@/admin/components/Footer';
import styles from './AdminLayout.module.scss';
import { Grid } from '@mui/material';
import { HiMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';

export const AdminLayout: React.FC = ({ children }) => {
  const [isMobileMenuShown, setIsMobileMenuShown] = useState<boolean>(false);

  const onHamburgerClick = () => {
    isMobileMenuShown ? setIsMobileMenuShown(false) : setIsMobileMenuShown(true);
  };

  return (
    <div className={`${styles.container} ${styles.admin}`}>
      <AdminHeader isMobileShown={isMobileMenuShown} />
      <div className={`${styles.hamburger} ${isMobileMenuShown ? styles.active : ''}`} onClick={onHamburgerClick}>
        {isMobileMenuShown
          ? <IoClose className={styles.closeIcon} />
          : <HiMenu />}
      </div>
      <main className={styles.main}>
        <Grid container spacing={2} columns={{ xs: 12, md: 12 }}>
          {children}
        </Grid>
      </main>
      <AdminFooter />
    </div>
  );
};
