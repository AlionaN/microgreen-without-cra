import React from 'react';
import styles from './AdminFooter.module.scss';

export const AdminFooter: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>2021</div>
    </footer>
  )
}
