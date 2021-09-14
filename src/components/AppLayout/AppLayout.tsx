import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import styles from './AppLayout.module.scss';
import { Modal } from '@/components/Modal';
import { SignInForm } from '@/components/Forms';

export const AppLayout: React.FC = ({ children }) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onSignInClick = () => {
    setIsModalOpen(true);
  };

  const onCloseModalClick = () => {
    setIsModalOpen(false);
  }

  return (
    <section className={styles.section}>
      <Header onSignInClick={onSignInClick} />
        {children}
      <Footer />
      <Modal isModalOpen={isModalOpen} onCloseModal={onCloseModalClick} form={<SignInForm />} />
    </section>
  );
};
