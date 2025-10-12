import { lazy } from 'react';

const articleRoutes = {
  path: 'article',
  children: [
    {
      path: 'list',
      Component: lazy(() => import('#/pages/article/list')),
    },
  ],
};

export default articleRoutes;
