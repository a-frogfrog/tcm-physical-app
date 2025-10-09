import { lazy } from 'react';

const customerRoutes = {
  path: 'customer',
  children: [
    {
      path: 'list',
      Component: lazy(() => import('#/features/customer/list')),
    },
    {
      path: 'add',
      Component: lazy(() => import('#/features/customer/add')),
    },
  ],
};

export default customerRoutes;
