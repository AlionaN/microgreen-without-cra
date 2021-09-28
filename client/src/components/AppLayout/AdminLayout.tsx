import React from 'react';
import { AdminHeader } from '@/admin/components/Header';
import { AdminFooter } from '@/admin/components/Footer';
import styles from './AppLayout.module.scss';

export const AdminLayout: React.FC = ({ children }) => {

  return (
    <div className={styles.container}>
      <AdminHeader />
        <main className={styles.main}>
          {children}
        </main>
      <AdminFooter />
    </div>
  );
};
