import { Navigate, type RouteObject } from 'react-router-dom';

import { routes as routesConfig } from '#/config/routes';
import { coreRoutes } from './core';

import { lazy } from 'react';

const routes: RouteObject[] = [
  {
    path: '/',
    Component: lazy(() => import('#/layouts')),
    children: [
      // 重定向到/home
      {
        index: true,
        element: <Navigate to='/home' replace />,
      },
      {
        path: routesConfig.home.path,
        Component: lazy(() => import('#/features/home')),
      },
      {
        path: routesConfig.promotion.path,
        Component: lazy(() => import('#/features/promotion')),
      },
      {
        path: routesConfig.user.path,
        Component: lazy(() => import('#/features/user')),
      },
      {
        path: routesConfig.commission.path,
        Component: lazy(() => import('#/features/commission')),
      },
      {
        path: routesConfig.booking.path,
        Component: lazy(() => import('#/features/booking')),
      },
    ],
  },
  ...coreRoutes,
];

export default routes;
