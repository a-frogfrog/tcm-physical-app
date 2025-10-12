import { lazy } from 'react';

const dashboardRoutes = {
  path: '/dashboard',
  children: [
    {
      index: true,
      path: 'workbench',
      Component: lazy(() => import('#/pages/dashboard/workbench')),
    },
    {
      path: 'analysis',
      Component: lazy(() => import('#/pages/dashboard/analysis')),
    },
  ],
};

export default dashboardRoutes;
