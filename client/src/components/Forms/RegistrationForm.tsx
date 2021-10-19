import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Forms.module.scss';
import * as actions from '@/store/actions';
import { IUserRegisterRequest } from '@/interfaces';
import { useForm } from 'react-hook-form';
import { EMAIL_PATTERN } from '@/constants';
import { RootState } from '@/store/reducers';

interface IProps {
  onFormChange: () => void,
};

export const RegistrationForm: React.FC<IProps> = ({ onFormChange }: IProps) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<IUserRegisterRequest>();
  const registerStatus = useSelector((state: RootState) => state.userReducer.registerStatus);

  const [userInfo, setUserInfo] = useState<IUserRegisterRequest>({
    firstName: '',
    secondName: '',
    email: '',
    img: '',
    password: '',
    password_confirm: '',
  });

  const onRegister = () => {
    console.log(userInfo);
    console.log(registerStatus);
    dispatch(actions.register(userInfo));
    console.log(registerStatus);
  };

  const onInputChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
  
    setUserInfo({
      ...userInfo,
      [target.name]: target.value
    });
  };

  return (
    <>
    {registerStatus.success
      ? <div className={styles.message}>You are successfully registered</div>
      : <>
      <div className={styles.title}>Registration form</div>
      <form className={styles.form} onSubmit={handleSubmit(onRegister)}>
        <input 
          className={styles.formInput} 
          {...register('firstName', { required: true, minLength: 2 })} 
          type="text" 
          placeholder="First name" 
          onChange={(e) => onInputChange(e)}
          autoComplete="off"
        />
        <div className={styles.error}>{errors.firstName && "First name is required and must be at least 2 characters length"}</div>
        <input 
          className={styles.formInput} 
          {...register('secondName', { required: true, minLength: 2 })} 
          type="text"
          placeholder="Second name" 
          onChange={(e) => onInputChange(e)}
          autoComplete="off"
        />
        <div className={styles.error}>{errors.secondName && "Second name is required and must be at least 2 characters length"}</div>
        <input 
          className={styles.formInput} 
          {...register('email', { required: true, pattern: EMAIL_PATTERN })} 
          type="email" 
          placeholder="Email"
          onChange={(e) => onInputChange(e)}
          autoComplete="off"
        />
        <div className={styles.error}>{errors.email && "Email is required"}</div>
        <input 
          className={`${styles.formInput} ${styles.formInputFile}`} 
          {...register('img', { required: false })} 
          type="file"
          onChange={(e) => onInputChange(e)}
        />
        <div className={styles.error}>{errors.img && "Image is required"}</div>
        <input 
          className={styles.formInput} 
          {...register('password', { required: true, pattern: /^[a-zA-Z0-9]{8,}$/ })} 
          type="password" 
          placeholder="Password"
          onChange={(e) => onInputChange(e)}
          autoComplete="off"
        />
        <div className={styles.error}>{errors.password && "Password is required"}</div>
        <input 
          className={styles.formInput}
          {...register('password_confirm', { required: true, pattern: /^[a-zA-Z0-9]{8,}$/ })}
          type="password" 
          placeholder="Password confirmation" 
          onChange={(e) => onInputChange(e)}
          autoComplete="off"
        />
        <div className={styles.error}>{errors.password_confirm && "Password confirmation is required"}</div>
        <input type="submit" className={styles.formBtn} disabled={registerStatus.loading} />
      </form>
      <div className={styles.message}>If you have already registered, go to the <span className={styles.linkToLogIn} onClick={onFormChange}>log in form</span></div>
    </>}
    </>
  )
}
