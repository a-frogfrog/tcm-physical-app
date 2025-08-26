import { lazy } from 'react';

const orderRoutes = {
  path: 'order',
  children: [
    {
      path: 'list',
      Component: lazy(() => import('#/pages/order/list')),
    },
  ],
};

export default orderRoutes;
