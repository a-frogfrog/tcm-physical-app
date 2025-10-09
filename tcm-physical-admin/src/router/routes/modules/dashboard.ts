import { lazy } from 'react';

const dashboardRoutes = {
  path: '/dashboard',
  children: [
    {
      index: true,
      path: 'workbench',
      Component: lazy(() => import('#/features/dashboard/workbench')),
    },
    {
      path: 'analysis',
      Component: lazy(() => import('#/features/dashboard/analysis')),
    },
  ],
};

export default dashboardRoutes;
