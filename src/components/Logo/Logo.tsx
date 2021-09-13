import React from 'react';
import { NavLink } from 'react-router-dom';
import { Routes } from '@enums';
import styles from './Logo.module.scss';

export const Logo: React.FC = () => {
  return (
    <NavLink className={styles.logo} to={Routes.Root}>
      Micro
    </NavLink>
  );
}
