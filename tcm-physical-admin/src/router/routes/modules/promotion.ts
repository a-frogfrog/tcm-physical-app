import { lazy } from 'react';

const promotionRoutes = {
  path: 'promotion',
  children: [
    {
      path: 'list',
      Component: lazy(() => import('#/features/promotion/list')),
    },
    {
      path: 'add',
      Component: lazy(() => import('#/features/promotion/add')),
    },
    {
      path: 'rule',
      Component: lazy(() => import('#/features/promotion/rule')),
    },
  ],
};

export default promotionRoutes;
