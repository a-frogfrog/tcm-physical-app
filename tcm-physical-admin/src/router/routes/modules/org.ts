import { lazy } from 'react';

const orgRoutes = {
  path: 'org',
  children: [
    {
      path: 'user',
      Component: lazy(() => import('#/pages/org/user')),
    },
  ],
};

export default orgRoutes;
