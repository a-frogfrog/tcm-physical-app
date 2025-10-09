import { lazy } from 'react';

const productRoutes = {
  path: 'product',
  children: [
    {
      path: 'service',
      Component: lazy(() => import('#/pages/product/service')),
    },
    {
      path: 'package',
      Component: lazy(() => import('#/pages/product/package')),
    },
    {
      path: 'add',
      Component: lazy(() => import('#/pages/product/add')),
    },
  ],
};

export default productRoutes;
