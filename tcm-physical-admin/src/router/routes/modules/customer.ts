import { lazy } from 'react';

const customerRoutes = {
  path: 'customer',
  children: [
    {
      path: 'list',
      Component: lazy(() => import('#/pages/customer/list')),
    },
  ],
};

export default customerRoutes;
