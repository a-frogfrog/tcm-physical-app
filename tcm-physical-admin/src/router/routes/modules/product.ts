import { lazy } from 'react';

const productRoutes = {
  path: 'product',
  children: [
    {
      path: 'service',
      Component: lazy(() => import('#/features/product/service')),
    },
    {
      path: 'package',
      Component: lazy(() => import('#/features/product/package')),
    },
    {
      path: 'add',
      Component: lazy(() => import('#/features/product/add')),
    },
  ],
};

export default productRoutes;
