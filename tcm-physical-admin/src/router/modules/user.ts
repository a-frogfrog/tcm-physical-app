import { lazy } from 'react';

const userRoutes = {
  path: 'user',
  children: [
    {
      path: 'profile',
      Component: lazy(() => import('#/features/user/profile')),
    },
  ],
};

export default userRoutes;
