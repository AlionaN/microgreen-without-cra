import { AdminRoutes } from '@/enums';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdminHeader.module.scss';

export const AdminHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTitle}>Microgreen Admin Panel</div>
      <nav className={styles.headerNav}>
        <ul className={styles.headerNavList}>
          <li className={styles.headerNavListItem}><span className={styles.headerNavListItemText}>Shop</span>
            <ul className={styles.headerNavSublist}>
              <li className={styles.headerNavSublistItem}><NavLink to={AdminRoutes.Categories}>Categories</NavLink></li>
              <li className={styles.headerNavSublistItem}><NavLink to={AdminRoutes.Products}>Products</NavLink></li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};
