import React from 'react';
import { Logo } from '@/components/Logo';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Logo />
      <div className={styles.copyright}>2021</div>
    </footer>
  );
}
