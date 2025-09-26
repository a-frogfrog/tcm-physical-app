export const routes = {
  auth: {
    login: {
      path: '/auth/login',
    },
    register: {
      path: '/auth/register',
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
  tabbar: {
    home: {
      path: '/home',
    },
    booking: {
      path: '/booking',
    },
    promotion: {
      path: '/promotion',
    },
    commission: {
      path: '/commission',
    },
    user: {
      path: '/user',
    },
  },
  article: {
    list: {
      path: '/article/list',
    },
  },
};
