import {
  CircleDollarSign,
  ClockFading,
  Home,
  MessageCircle,
  User,
} from 'lucide-react';
import { createElement } from 'react';

export const tabs = [
  {
    to: '/home',
    label: '首页',
    icon: createElement(Home, { size: 20 }),
  },
  {
    to: '/promotion',
    label: '推广',
    icon: createElement(MessageCircle, { size: 20 }),
  },
  {
    to: '/booking',
    label: '预约',
    icon: createElement(ClockFading, { size: 20 }),
  },
  {
    to: '/commission',
    label: '佣金',
    icon: createElement(CircleDollarSign, { size: 20 }),
  },
  {
    to: '/user',
    label: '我的',
    icon: createElement(User, { size: 20 }),
  },
];
