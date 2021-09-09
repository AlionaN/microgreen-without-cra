/* eslint-disable import/prefer-default-export */
import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from './AppLayout.module.scss';

export const AppLayout: React.FC = ({ children }) => {
  return (
    <section className={styles.section}>
      <Header />
      {children}
      <Footer />
    </section>
  );
};
