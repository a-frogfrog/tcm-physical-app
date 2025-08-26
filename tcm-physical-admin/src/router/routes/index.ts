import { lazy } from 'react';
import dashboardRoutes from './modules/dashboard';
import authRoutes from './modules/auth';
import errorRoutes from './modules/error';
import productRoutes from './modules/product';
import customerRoutes from './modules/customer';
import orderRoutes from './modules/order';
import orgRoutes from './modules/org';
import promoteRoutes from './modules/promote';
import scheduleRoutes from './modules/schedule';

const routes = [
  {
    path: '/',
    Component: lazy(() => import('#/layouts')),
    children: [
      dashboardRoutes,
      productRoutes,
      customerRoutes,
      orderRoutes,
      orgRoutes,
      promoteRoutes,
      scheduleRoutes,
    ],
  },
  authRoutes,
  errorRoutes,
];

export default routes;
