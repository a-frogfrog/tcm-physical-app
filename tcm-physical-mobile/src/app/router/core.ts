import { routes as routesConfig } from '#/config/routes';

import { lazy } from 'react';

export const coreRoutes = [
  {
    path: routesConfig.auth.login.path,
    Component: lazy(() => import('#/features/auth/login')),
  },
  {
    path: routesConfig.auth.register.path,
    Component: lazy(() => import('#/features/auth/register')),
  },
  {
    //404错误路由.
    path: routesConfig.fallback.notFound.path,
    Component: lazy(() => import('#/features/fallback/NotFound')),
  },
  {
    // 无权限路由.
    path: routesConfig.fallback.forbidden.path,
    Component: lazy(() => import('#/features/fallback/Forbidden')),
  },
  {
    // 无网络路由.
    path: routesConfig.fallback.offline.path,
    Component: lazy(() => import('#/features/fallback/Offline')),
  },
  {
    // 服务器错误路由.
    path: routesConfig.fallback.internalError.path,
    Component: lazy(() => import('#/features/fallback/InternalError')),
  },
];
