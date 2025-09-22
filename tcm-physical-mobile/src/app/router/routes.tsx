import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    Component: lazy(() => import('#/layouts')),
    children: [
      { index: true, element: <Navigate to='/home' replace /> }, // 重定向到/home
      {
        path: 'home',
        Component: lazy(() => import('#/pages/home')),
      },
      {
        path: 'promotion',
        Component: lazy(() => import('#/pages/promotion')),
      },
      {
        path: 'user',
        Component: lazy(() => import('#/pages/user')),
      },
      {
        path: 'commission',
        Component: lazy(() => import('#/pages/commission')),
      },
      {
        path: 'booking',
        Component: lazy(() => import('#/pages/booking')),
      },
      {
        //404错误路由.
        path: '*',
        Component: lazy(() => import('#/pages/error/NotFound')),
      },
    ],
  },
];

export default routes;
