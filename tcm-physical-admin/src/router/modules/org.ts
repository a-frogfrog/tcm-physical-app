import { lazy } from 'react';

const orgRoutes = {
  path: 'org',
  children: [
    {
      path: 'manager',
      Component: lazy(() => import('#/pages/org/manager')),
    },
  ],
};

export default orgRoutes;
