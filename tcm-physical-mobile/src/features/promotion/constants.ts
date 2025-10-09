import { Link2 } from 'lucide-react';
import React from 'react';

export const shareOptions = [
  {
    name: '微信',
    icon: React.createElement(Link2, { className: 'h-5 w-5 text-green-500' }),
    handleClick: () => {
      location.href = 'weixin://';
    },
  },
  {
    name: '微博',
    icon: React.createElement(Link2, { className: 'h-5 w-5 text-red-500' }),
  },
  {
    name: 'QQ',
    icon: React.createElement(Link2, { className: 'h-5 w-5 text-blue-500' }),
  },
  {
    name: '更多',
    icon: React.createElement(Link2, { className: 'h-5 w-5 text-gray-500' }),
  },
];
