import { useApplication } from '#/hooks';
import {
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from 'lucide-react';

export const useFetchSidebarData = () => {
  const { name } = useApplication();
  const user = {
    name: '老中医·黄',
    email: 'tcm@example.com',
    avatar: '/avatars/frog.jpg',
  };

  const logoItem = {
    name,
    logo: GalleryVerticalEnd,
    plan: 'Enterprise',
  };

  const navMain = [
    {
      title: '仪表板',
      url: '/dashboard',
      icon: SquareTerminal,
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
      icon: Bot,
      items: [
        {
          title: '列表',
          url: '/product/list',
        },
        {
          title: '套餐',
          url: '/product/package',
        },
      ],
    },
    {
      title: '订单',
      url: '/order',
      icon: Bot,
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
      icon: BookOpen,
      items: [
        {
          title: '列表',
          url: '/schedule/list',
        },
      ],
    },
    {
      title: '推广',
      url: '/promote',
      icon: Settings2,
      items: [
        {
          title: '列表',
          url: '/promote/list',
        },
      ],
    },
    {
      title: '客户',
      url: '/customer',
      icon: Settings2,
      items: [
        {
          title: '列表',
          url: '/customer/list',
        },
      ],
    },
    {
      title: '组织架构',
      url: '/org',
      icon: Settings2,
      items: [
        {
          title: '用户',
          url: '/org/user',
        },
      ],
    },
  ];

  return {
    name,
    navMain,
    user,
    logoItem,
  };
};
