import { authApi } from './auth';
import { useQuery } from '@tanstack/react-query';

export function useAuth() {
  return useQuery({
    queryKey: ['login'],
    queryFn: authApi.fetchAuthLogin,
  });
}
