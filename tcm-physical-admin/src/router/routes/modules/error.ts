import { lazy } from 'react';

const errorRoutes = {
  path: '*',
  Component: lazy(() => import('#/pages/error/NotFound')),
};

export default errorRoutes;
