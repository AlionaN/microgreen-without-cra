import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { Routes } from '@/enums';
import { Logo } from '@/components/Logo';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';

interface IHeader {
  onSignInClick?: () => void,
}

export const Header: React.FC<IHeader> = ({ onSignInClick }: IHeader) => {

  const user = useSelector((state: RootState) => state.userReducer.user);

  const onSignOutClick = ():void => {
    console.log('log out');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Logo />
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navListItem}>
              <NavLink exact to={Routes.Shop}>Products</NavLink>
            </li>
            <li className={styles.navListItem}>
              <NavLink exact to={Routes.AboutUs}>About us</NavLink>
            </li>
            <li className={styles.navListItem}>
              <NavLink exact to={Routes.Delivery}>Delivery</NavLink>
            </li>
            <li className={styles.navListItem}>
              <NavLink exact to={Routes.Payment}>Payment</NavLink>
            </li>
            <li className={styles.navListItem}>
              <NavLink exact to={Routes.Contacts}>Contacts</NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.userFunc}>
          {user.isSignIn
            ? <div className={styles.userFuncAuth}>
                <div>Hello, {user.firstName}</div>
                <div onClick={onSignOutClick}>Sign out</div>
              </div>
            : <div className={styles.userFuncAuth} onClick={onSignInClick}>Sign in</div>
          }
          <div className={styles.userImg}><img src={user.img}/></div>
          <div className={styles.cart}><FaShoppingCart /></div>
        </div>
      </div>
    </header>
  );
}
