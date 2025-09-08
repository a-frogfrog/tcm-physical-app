import { lazy } from 'react';

const userRoutes = {
  path: 'user',
  children: [
    {
      path: 'profile',
      Component: lazy(() => import('#/pages/user/profile')),
    },
  ],
};

export default userRoutes;
