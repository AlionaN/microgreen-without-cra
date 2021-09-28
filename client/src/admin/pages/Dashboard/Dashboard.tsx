import { AdminLayout } from '@/components/AppLayout';
import React from 'react';
import styles from './Dashboard.module.scss';

export const Dashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div>
        <h1 className={styles.title}>Dashboard</h1>
      </div>
    </AdminLayout>
  )
}
