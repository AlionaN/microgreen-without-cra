import { Button } from '@/components/Button';
import React from 'react';
import styles from './Forms.module.scss';

export const SignInForm: React.FC = () => {
  return (
    <>
    <div className={styles.title}>Sign In</div>
    <form className={styles.form}>
      <input className={styles.formInput} type="email" placeholder="Email" />
      <input className={styles.formInput} type="password" placeholder="Password" />
      <Button className={styles.formBtn} btnText="send" />
    </form>
    <div className={styles.message}>If you have not registered yet, go to the <span className={styles.linkToRegistration}>registration form</span></div>
    </>
  )
}
