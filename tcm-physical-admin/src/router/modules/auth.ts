import { lazy } from 'react';
import { ROUTES } from '#/constants';

const authRoutes = {
  path: '/auth',
  children: [
    {
      path: ROUTES.LOGIN,
      Component: lazy(() => import('#/pages/auth/login')),
    },
  ],
};

export default authRoutes;
