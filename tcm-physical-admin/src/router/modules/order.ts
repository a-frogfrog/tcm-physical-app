import { lazy } from 'react';

const orderRoutes = {
  path: 'order',
  children: [
    {
      path: 'list',
      Component: lazy(() => import('#/features/order/list')),
    },
  ],
};

export default orderRoutes;
