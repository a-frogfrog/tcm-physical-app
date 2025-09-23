import { routes as routesConfig } from '#/config/routes';
import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    Component: lazy(() => import('#/layouts')),
    children: [
      { index: true, element: <Navigate to='/home' replace /> }, // 重定向到/home
      {
        path: routesConfig.home.path,
        Component: lazy(() => import('#/pages/home')),
      },
      {
        path: routesConfig.promotion.path,
        Component: lazy(() => import('#/pages/promotion')),
      },
      {
        path: routesConfig.user.path,
        Component: lazy(() => import('#/pages/user')),
      },
      {
        path: routesConfig.commission.path,
        Component: lazy(() => import('#/pages/commission')),
      },
      {
        path: routesConfig.booking.path,
        Component: lazy(() => import('#/pages/booking')),
      },

      {
        //404错误路由.
        path: '*',
        Component: lazy(() => import('#/pages/error/NotFound')),
      },
    ],
  },
  {
    path: routesConfig.auth.login.path,
    Component: lazy(() => import('#/pages/auth/login')),
  },
  {
    path: routesConfig.auth.register.path,
    Component: lazy(() => import('#/pages/auth/register')),
  },
];

export default routes;
