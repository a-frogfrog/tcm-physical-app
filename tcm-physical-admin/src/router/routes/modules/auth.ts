import { lazy } from 'react';
import { ROUTES } from '#/constants';

const authRoutes = {
  path: '/auth',
  children: [
    {
      path: ROUTES.LOGIN,
      Component: lazy(() => import('#/features/auth/login')),
    },
  ],
};

export default authRoutes;
