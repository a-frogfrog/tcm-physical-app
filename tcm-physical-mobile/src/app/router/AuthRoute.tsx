import { useAuthStore } from '#/store';
import { Navigate } from 'react-router-dom';
import { routes } from '#/config/routes';
import { useAuthCheck } from '#/features/auth/hooks/useFetchAuth';

export default function AuthRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.token);
  const { mutate: checkAuth, isError } = useAuthCheck();
  if (!user) {
    checkAuth();
    if (isError) {
      return <Navigate to={routes.auth.login.path} replace />;
    }
    return children;
  }
  return children;
}
