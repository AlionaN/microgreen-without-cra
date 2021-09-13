import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { Routes } from '@enums';
import { Logo } from '@components/Logo';
import styles from './Header.module.scss';

interface IHeader {
  onLogInClick?: () => void
}

export const Header: React.FC<IHeader> = ({ onLogInClick }: IHeader) => {
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
          <div className={styles.userFuncAuth} onClick={onLogInClick}>Log in</div>
          <FaShoppingCart />
        </div>
      </div>
    </header>
  );
}
