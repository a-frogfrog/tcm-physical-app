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
        path: routesConfig.tabbar.home.path,
        Component: lazy(() => import('#/features/home')),
      },
      {
        path: routesConfig.tabbar.promotion.path,
        Component: lazy(() => import('#/features/promotion')),
      },
      {
        path: routesConfig.tabbar.user.path,
        Component: lazy(() => import('#/features/user')),
      },
      {
        path: routesConfig.tabbar.commission.path,
        Component: lazy(() => import('#/features/commission')),
      },
      {
        path: routesConfig.tabbar.booking.path,
        Component: lazy(() => import('#/features/booking')),
      },
    ],
  },
  {
    path: routesConfig.article.list.path,
    Component: lazy(() => import('#/features/article/list')),
  },
  ...coreRoutes,
];

export default routes;
