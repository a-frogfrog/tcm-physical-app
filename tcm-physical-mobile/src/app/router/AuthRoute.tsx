import { useAuthStore } from '#/store';
import { Navigate } from 'react-router-dom';
import { routes } from '#/config/routes';

export default function AuthRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    console.log('user', user);
    return <Navigate to={routes.auth.login.path} replace />;
  }
  return children;
}
