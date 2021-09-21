import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Forms.module.scss';
import { registerSuccess } from '@/store/actions';
import { IUser } from '@/interfaces';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EMAIL_PATTERN } from '@/constants';

interface IFormInput {
  firstName: String,
  secondName: String,
  email: String,
  img: String,
  password: String,
  password_confirm: String
}

export const RegistrationForm: React.FC = () => {

  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm<IFormInput>();

  const [userInfo, setUserInfo] = useState<IUser>({
    userId: '',
    firstName: '',
    secondName: '',
    email: '',
    img: '',
    password: '',
    password_confirm: '',
    isSignIn: false,
  });

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    dispatch(registerSuccess(userInfo));
  }

  const onInputChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
  
    setUserInfo({
      ...userInfo,
      userId: new Date().toString(),
      isSignIn: true,
      [target.name]: target.value
    });
    console.log(userInfo);
  } 

  return (
    <>
    {isSubmitted 
      ? <div className={styles.message}>You are successfully registered</div>
      : <>
      <div className={styles.title}>Registration form</div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input 
          className={styles.formInput} 
          {...register('firstName', { required: true, minLength: 2 })} 
          type="text" 
          placeholder="First name" 
          onChange={(e) => onInputChange(e)}
        />
        <div className={styles.error}>{errors.firstName && "First name is required and must be at least 2 characters length"}</div>
        <input 
          className={styles.formInput} 
          {...register('secondName', { required: true, minLength: 2 })} 
          type="text"
          placeholder="Second name" 
          onChange={(e) => onInputChange(e)}
        />
        <div className={styles.error}>{errors.secondName && "Second name is required and must be at least 2 characters length"}</div>
        <input 
          className={styles.formInput} 
          {...register('email', { required: true, pattern: EMAIL_PATTERN })} 
          type="email" 
          placeholder="Email"
          onChange={(e) => onInputChange(e)}
        />
        <div className={styles.error}>{errors.email && "Email is required"}</div>
        <input 
          className={`${styles.formInput} ${styles.formInputFile}`} 
          {...register('img', { required: true })} 
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
        />
        <div className={styles.error}>{errors.password && "Password is required"}</div>
        <input 
          className={styles.formInput}
          {...register('password_confirm', { required: true, pattern: /^[a-zA-Z0-9]{8,}$/ })}
          type="password" 
          placeholder="Password confirmation" 
          onChange={(e) => onInputChange(e)}
        />
        <div className={styles.error}>{errors.password_confirm && "Password confirmation is required"}</div>
        <input type="submit" className={styles.formBtn} />
      </form>
      <div className={styles.message}>If you have already registered, go to the <span className={styles.linkToLogIn}>log in form</span></div>
    </>}
    </>
  )
}
