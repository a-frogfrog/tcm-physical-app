import { lazy } from 'react';

const orgRoutes = {
  path: 'org',
  children: [
    {
      path: 'manager',
      Component: lazy(() => import('#/features/org/manager')),
    },
  ],
};

export default orgRoutes;
