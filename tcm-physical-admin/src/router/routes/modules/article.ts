import { lazy } from 'react';

const articleRoutes = {
  path: 'article',
  children: [
    {
      path: 'list',
      Component: lazy(() => import('#/features/article/list')),
    },
  ],
};

export default articleRoutes;
