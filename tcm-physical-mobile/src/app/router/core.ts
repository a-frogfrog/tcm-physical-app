import { routes as routesConfig } from '#/config/routes';

import { lazy } from 'react';

export const coreRoutes = [
  {
    path: routesConfig.auth.login.path,
    Component: lazy(() => import('./routes/auth/login')),
  },
  {
    path: routesConfig.auth.register.path,
    Component: lazy(() => import('./routes/auth/register')),
  },
  {
    //404错误路由.
    path: routesConfig.fallback.notFound.path,
    Component: lazy(() => import('#/features/fallback/components/NotFound')),
  },
  {
    // 无权限路由.
    path: routesConfig.fallback.forbidden.path,
    Component: lazy(() => import('#/features/fallback/components/Forbidden')),
  },
  {
    // 无网络路由.
    path: routesConfig.fallback.offline.path,
    Component: lazy(() => import('#/features/fallback/components/Offline')),
  },
  {
    // 服务器错误路由.
    path: routesConfig.fallback.internalError.path,
    Component: lazy(
      () => import('#/features/fallback/components/InternalError'),
    ),
  },
];
