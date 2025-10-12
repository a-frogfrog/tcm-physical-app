import { lazy } from 'react';

const customerRoutes = {
  path: 'customer',
  children: [
    {
      path: 'list',
      Component: lazy(() => import('#/pages/customer/list')),
    },
    {
      path: 'add',
      Component: lazy(() => import('#/pages/customer/add')),
    },
    {
      path: 'pool',
      Component: lazy(() => import('#/pages/customer/pool')),
    },
  ],
};

export default customerRoutes;
