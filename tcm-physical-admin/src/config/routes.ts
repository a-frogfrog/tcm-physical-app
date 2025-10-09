export const routes = {
  auth: {
    login: {
      path: '/auth/login',
    },
  },
  core: {
    dashboard: {
      workbench: {
        path: '/dashboard/workbench',
      },
      analysis: {
        path: '/dashboard/analysis',
      },
    },
  },
  fallback: {
    notFound: {
      path: '*',
    },
    offline: {
      path: '/offline',
    },
    forbidden: {
      path: '/forbidden',
    },
    internalError: {
      path: '/internal-error',
    },
  },
};
