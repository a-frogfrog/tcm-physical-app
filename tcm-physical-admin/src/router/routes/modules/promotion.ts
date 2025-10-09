import { lazy } from 'react';

const promotionRoutes = {
  path: 'promotion',
  children: [
    {
      path: 'list',
      Component: lazy(() => import('#/pages/promotion/list')),
    },
    {
      path: 'add',
      Component: lazy(() => import('#/pages/promotion/add')),
    },
    {
      path: 'rule',
      Component: lazy(() => import('#/pages/promotion/rule')),
    },
  ],
};

export default promotionRoutes;
