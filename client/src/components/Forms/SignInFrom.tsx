import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Forms.module.scss';
import * as actions from '@/store/actions';
import { useForm } from 'react-hook-form';
import { IUserLoginRequest } from '@/interfaces';
import { RootState } from '@/store/reducers';

interface IProps {
  onFormChange: () => void,
};

export const SignInForm: React.FC<IProps> = ({ onFormChange }: IProps) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<IUserLoginRequest>();
  const loginStatus = useSelector((state: RootState) => state.userReducer.loginStatus);
  const isLogin = useSelector((state: RootState) => state.userReducer.isLogIn);
  const [loginErrors, setLoginErrors] = useState('');
  const [userLoginInfo, setUserLoginInfo] = useState<IUserLoginRequest>({
    email: '',
    password: '',
  });

  const onSignInClick = () => {
    try {
      dispatch(actions.login(userLoginInfo));

      setUserLoginInfo({
        ...userLoginInfo,
        email: '',
        password: ''
      });
    } catch (e) {
      setLoginErrors(loginStatus.errors);
    }
  };

  const onInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    setUserLoginInfo({
      ...userLoginInfo,
      [target.name]: target.value
    });
  };

  return (
    <>
    {isLogin
      ? <div className={styles.message}>You are successfully logged in</div>
      : <>
        <div className={styles.title}>Sign In</div>
        <form className={styles.form} onSubmit={handleSubmit(onSignInClick)}>
          <input 
            className={styles.formInput} 
            {...register('email', { required: true })} 
            type="email" 
            placeholder="Email" 
            onChange={(e) => onInputChange(e)}
          />
          <div className={styles.error}>{errors.email && "Field is required"}</div>
          <input 
            className={styles.formInput} 
            {...register('password', { required: true })} 
            type="password" 
            placeholder="Password" 
            onChange={(e) => onInputChange(e)}
          />
          <div className={styles.error}>{errors.password && "Field is required"}</div>
          {loginStatus.errors && <div className={styles.errors}>{loginErrors}</div>}
          <input type="submit" className={styles.formBtn} disabled={loginStatus.loading} />
        </form>
        <div className={styles.message}>If you have not registered yet, go to the <span className={styles.linkToRegistration} onClick={onFormChange}>registration form</span></div>
      </>
    }
    </>
  );
};
