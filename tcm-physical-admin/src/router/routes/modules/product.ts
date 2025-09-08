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
    {
      path: 'add',
      Component: lazy(() => import('#/pages/product/add')),
    },
  ],
};

export default productRoutes;
