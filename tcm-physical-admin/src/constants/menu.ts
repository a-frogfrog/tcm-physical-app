import {
  Barcode,
  Building2,
  ClockFading,
  Gauge,
  ListOrdered,
  MessageSquareShare,
  UserStar,
} from 'lucide-react';

export const sidebarMenu = [
  {
    title: '仪表板',
    url: '/dashboard',
    icon: Gauge,
    isActive: true,
    items: [
      {
        title: '分析页',
        url: '/dashboard/analysis',
      },
      {
        title: '工作台',
        url: '/dashboard/workbench',
      },
    ],
  },
  {
    title: '产品管理',
    url: '/product',
    icon: Barcode,
    items: [
      {
        title: '列表',
        url: '/product/list',
      },
      {
        title: '套餐',
        url: '/product/package',
      },
      {
        title: '新增',
        url: '/product/add',
      },
    ],
  },
  {
    title: '订单',
    url: '/order',
    icon: ListOrdered,
    items: [
      {
        title: '列表',
        url: '/order/list',
      },
    ],
  },
  {
    title: '排班',
    url: '/schedule',
    icon: ClockFading,
    items: [
      {
        title: '安排排班',
        url: '/schedule/arrange',
      },
    ],
  },
  {
    title: '推广',
    url: '/promotion',
    icon: MessageSquareShare,
    items: [
      {
        title: '列表',
        url: '/promotion/list',
      },
      {
        title: '新增',
        url: '/promotion/add',
      },
    ],
  },
  {
    title: '客户',
    url: '/customer',
    icon: UserStar,
    items: [
      {
        title: '列表',
        url: '/customer/list',
      },
      {
        title: '新增',
        url: '/customer/add',
      },
    ],
  },
  {
    title: '组织架构',
    url: '/org',
    icon: Building2,
    items: [
      {
        title: '用户',
        url: '/org/user',
      },
    ],
  },
];
