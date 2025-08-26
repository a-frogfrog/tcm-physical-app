import { lazy } from 'react';

const authRoutes = {
  path: '/auth',
  children: [
    {
      path: 'login',
      Component: lazy(() => import('#/pages/auth/login')),
    },
  ],
};

export default authRoutes;
