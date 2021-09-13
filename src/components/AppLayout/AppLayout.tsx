import React from 'react';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import styles from './AppLayout.module.scss';
import { SignInModal, Modal } from '@components/Modal';

export const AppLayout: React.FC = ({ children }) => {
  return (
    <section className={styles.section}>
      <Header />
      {children}
      <Footer />
      <Modal children={<SignInModal />} />
    </section>
  );
};
