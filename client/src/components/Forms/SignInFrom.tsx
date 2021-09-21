import { Button } from '@/components/Button';
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Forms.module.scss';
import * as actionTypes from '@/store/actionTypes'

export const SignInForm: React.FC = () => {

  const dispatch = useDispatch();

  const onSignInClick = () => {
    
  }

  return (
    <>
    <div className={styles.title}>Sign In</div>
    <form className={styles.form}>
      <input className={styles.formInput} type="email" placeholder="Email" />
      <input className={styles.formInput} type="password" placeholder="Password" />
      <Button classes={styles.formBtn} btnText="send" onClick={onSignInClick} />
    </form>
    <div className={styles.message}>If you have not registered yet, go to the <span className={styles.linkToRegistration}>registration form</span></div>
    </>
  )
}
