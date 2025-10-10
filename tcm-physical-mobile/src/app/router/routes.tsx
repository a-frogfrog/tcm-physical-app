import { Navigate, type RouteObject } from 'react-router-dom';

import { routes as routesConfig } from '#/config/routes';
import { coreRoutes } from './core';

import { lazy } from 'react';
import AuthRoute from './AuthRoute';

const Layout = lazy(() => import('#/layouts'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      // 重定向到/home
      {
        index: true,
        element: <Navigate to='/home' replace />,
      },
      {
        path: routesConfig.tabbar.home.path,
        Component: lazy(() => import('./routes/home')),
      },
      {
        path: routesConfig.tabbar.promotion.path,
        Component: lazy(() => import('./routes/promotion')),
      },
      {
        path: routesConfig.tabbar.user.path,
        Component: lazy(() => import('./routes/user')),
      },
      {
        path: routesConfig.tabbar.commission.path,
        Component: lazy(() => import('./routes/commission')),
      },
      {
        path: routesConfig.tabbar.booking.path,
        Component: lazy(() => import('./routes/booking')),
      },
      {
        path: routesConfig.tabbar.booking.path + '/list',
        Component: lazy(() => import('./routes/booking/list')),
      },
      {
        path: routesConfig.article.list.path,
        Component: lazy(() => import('./routes/article/list')),
      },
    ],
  },

  ...coreRoutes,
];

export default routes;
