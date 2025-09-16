import { lazy } from 'react';

const routes = [
  {
    path: '/',
    Component: lazy(() => import('#/layouts')),
    children: [
      {
        path: '/home',
        Component: lazy(() => import('#/pages/home')),
      },
      {
        path: '/promotion',
        Component: lazy(() => import('#/pages/promotion')),
      },
      {
        path: '/user',
        Component: lazy(() => import('#/pages/user')),
      },
      {
        path: '/commission',
        Component: lazy(() => import('#/pages/commission')),
      },
    ],
  },
];

export default routes;
