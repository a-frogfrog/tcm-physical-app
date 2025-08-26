import { lazy } from 'react';

const productRoutes = {
  path: 'product',
  children: [
    {
      path: 'list',
      Component: lazy(() => import('#/pages/product/list')),
    },
    {
      path: 'package',
      Component: lazy(() => import('#/pages/product/package')),
    },
  ],
};

export default productRoutes;
