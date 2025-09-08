import { lazy } from 'react';

const promotionRoutes = {
  path: 'promotion',
  children: [
    {
      path: 'list',
      Component: lazy(() => import('#/pages/promotion/list')),
    },
  ],
};

export default promotionRoutes;
