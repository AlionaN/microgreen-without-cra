import { IStatus } from '@/interfaces';

export const getRequestState = (): IStatus => ({
  loading: true,
  success: null,
  error: null
});

export const getSuccessState = (success: any): IStatus => ({
  loading: false,
  success,
  error: null
});

export const getErrorState = (error: string | Error): IStatus => ({
  loading: false,
  success: null,
  error
});

export const getDefaultState = (): IStatus => ({
  loading: false,
  success: null,
  error: null
});
