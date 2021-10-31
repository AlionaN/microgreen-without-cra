import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Routes } from '@/enums';
import { Logo } from '@/components/Logo';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import * as actions from '@/store/actions';
import { Cart } from '@/components/Cart';

interface IHeader {
  onSignInClick?: () => void,
}

export const Header: React.FC<IHeader> = ({ onSignInClick }: IHeader) => {
  const dispatch = useDispatch();
  const isSignIn = useSelector((state: RootState) => state.userReducer.isLogIn);
  const user = useSelector((state: RootState) => state.userReducer.user);
  const userId = String(localStorage.getItem('userId'));

  useEffect(() => {
    userId && userId !== null && userId !== 'null' && dispatch(actions.getUser(userId));
  }, [userId]);

  const onSignOutClick = ():void => {
    dispatch(actions.logout());
    dispatch(actions.removeCart());
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
          {isSignIn && user !== null
            ? <>
              <div className={styles.userFuncAuth}>
                <div>Hello, {user.firstName}</div>
                <div onClick={onSignOutClick}>Sign out</div>
              </div>
              {user.img && <div className={styles.userImg}><img src={user.img}/></div>}
              </>
            : <div className={styles.userFuncAuth} onClick={onSignInClick}>Sign in</div>
          }
          <Cart />
        </div>
      </div>
    </header>
  );
}
