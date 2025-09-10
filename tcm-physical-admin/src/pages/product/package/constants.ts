import { Bike, Bubbles, Calculator, CloudDrizzle } from 'lucide-react';

export const cardItems = [
  {
    title: '套餐总数',
    value: 120,
    trend: {
      percentage: 10,
      isIncrease: true,
      compareText: '较上月增加',
    },
    icon: Bike,
    iconColor: 'bg-amber-00',
  },
  {
    title: '本月销量',
    value: 522,
    trend: {
      percentage: 10,
      isIncrease: true,
      compareText: '较上月增加',
    },
    icon: Bubbles,
  },
  {
    title: '热门套餐',
    value: 4,
    trend: {
      percentage: 10,
      isIncrease: true,
      compareText: '较上月增加',
    },
    icon: Calculator,
  },
  {
    title: '待更新套餐',
    value: 2,
    trend: {
      percentage: 10,
      isIncrease: true,
      compareText: '较上月增加',
    },
    icon: CloudDrizzle,
  },
];
