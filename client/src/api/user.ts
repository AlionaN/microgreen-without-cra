import { useHttp } from '@/hooks';
import { IUser } from '@/interfaces';

export const register = async (user: IUser) => {
  const { loading, error, request } = useHttp();
  try {
    const data = await request('/api/auth/register', 'POST', user);
    console.log(data);
  } catch (e) {}
}
