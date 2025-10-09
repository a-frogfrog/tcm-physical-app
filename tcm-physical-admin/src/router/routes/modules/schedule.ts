import { lazy } from 'react';

const scheduleRoutes = {
  path: 'schedule',
  children: [
    {
      path: 'arrange',
      Component: lazy(() => import('#/features/schedule/arrange')),
    },
  ],
};

export default scheduleRoutes;
