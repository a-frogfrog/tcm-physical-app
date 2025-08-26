import { lazy } from 'react';

const scheduleRoutes = {
  path: 'schedule',
  children: [
    {
      path: 'list',
      Component: lazy(() => import('#/pages/schedule/list')),
    },
  ],
};

export default scheduleRoutes;
