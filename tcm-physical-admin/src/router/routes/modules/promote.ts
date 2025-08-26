import { lazy } from 'react';

const promoteRoutes = {
  path: 'promote',
  children: [
    {
      path: 'list',
      Component: lazy(() => import('#/pages/promote/list')),
    },
  ],
};

export default promoteRoutes;
