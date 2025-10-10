import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

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
import AuthRoute from '../AuthRoute';
import { routes as routeConfig } from '#/config/routes';

const Layout = lazy(() => import('#/layouts'));

const routes = [
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Navigate to={routeConfig.core.dashboard.workbench.path} replace />
        ),
      },
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
