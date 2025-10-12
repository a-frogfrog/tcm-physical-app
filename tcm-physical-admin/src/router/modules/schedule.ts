import { lazy } from 'react';

const scheduleRoutes = {
  path: 'schedule',
  children: [
    {
      path: 'arrange',
      Component: lazy(() => import('#/pages/schedule/arrange')),
    },
  ],
};

export default scheduleRoutes;
