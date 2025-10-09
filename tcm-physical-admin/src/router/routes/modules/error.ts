import { lazy } from 'react';

const errorRoutes = {
  path: '*',
  Component: lazy(() => import('#/features/error/NotFound')),
};

export default errorRoutes;
