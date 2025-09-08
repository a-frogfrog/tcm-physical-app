import { lazy } from 'react';
import dashboardRoutes from './modules/dashboard';
import authRoutes from './modules/auth';
import errorRoutes from './modules/error';
import productRoutes from './modules/product';
import customerRoutes from './modules/customer';
import orderRoutes from './modules/order';
import orgRoutes from './modules/org';
import promotionRoutes from './modules/promotion';
import scheduleRoutes from './modules/schedule';
import userRoutes from './modules/user';

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
      promotionRoutes,
      scheduleRoutes,
      userRoutes,
    ],
  },
  authRoutes,
  errorRoutes,
];

export default routes;
