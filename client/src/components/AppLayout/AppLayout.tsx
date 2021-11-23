import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import styles from './AppLayout.module.scss';
import { Modal } from '@/components/Modal';
import { RegistrationForm, SignInForm } from '@/components/Forms';
import { useDispatch } from 'react-redux';
import * as actions from '@/store/actions';
import { Toaster } from 'react-hot-toast';
import { ThemeMode, defaultContext } from '@/theme';
import { Themes } from '@/enums';

export const AppLayout: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const [modalContent, setModalContent] = useState<string>('login');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || defaultContext.theme);
  const themeFromStorage = localStorage.getItem('theme');
  document.body.setAttribute('data-theme', theme === Themes.LIGHT ? '' : 'dark');

  useEffect(() => {
    theme === Themes.LIGHT ? setTheme(Themes.LIGHT) : setTheme(Themes.DARK);
    document.body.setAttribute('data-theme', themeFromStorage === Themes.LIGHT ? '' : 'dark');
  }, []);

  const onSignInClick = () => {
    setIsModalOpen(true);
  };

  const onCloseModalClick = () => {
    setIsModalOpen(false);
    dispatch(actions.clearLoginStatus());
    dispatch(actions.clearRegisterStatus());
    setModalContent('login');
  };

  const onFormChange = () => {
    modalContent === 'register' ? setModalContent('login') : setModalContent('register');
  };

  const themeSwitch = () => {
    theme === Themes.LIGHT ? setTheme(Themes.DARK) : setTheme(Themes.LIGHT);
    localStorage.setItem('theme', theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT);
  };

  return (
    <ThemeMode.Provider value={{theme, themeSwitch}}>
      <section className={`${styles.section}`}>
        <Header onSignInClick={onSignInClick} />
          {children}
        <Footer />
        <Modal isModalOpen={isModalOpen} onCloseModal={onCloseModalClick}>
          {modalContent === 'register' 
            ? <RegistrationForm onFormChange={onFormChange} />
            : <SignInForm onFormChange={onFormChange} />
          }
        </Modal>
        <Toaster
          position='top-left'
          toastOptions={{
            duration: 4000
          }}
        />
      </section>
    </ThemeMode.Provider>
  );
};
