import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const routes = [
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
      }
      ,
      {
        //404错误路由.
        path: '*',
        element: lazy(() => import('#/pages/error/NotFound')),
      },
    ],
  },
];

export default routes;
