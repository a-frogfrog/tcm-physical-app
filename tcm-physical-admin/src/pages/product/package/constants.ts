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

export const packageStatusOptions = [
  {
    label: '全部',
    value: 'all',
  },
  {
    label: '正常',
    value: 'normal',
  },
  {
    label: '停用',
    value: 'disabled',
  },
];

export const packageTableData = [
  {
    id: 'TC001',
    name: '全身推拿套餐',
    category: '推拿按摩',
    price: '¥298',
    originalPrice: '原价 ¥368',
    duration: '90分钟',
    items: ['肩颈推拿', '背部推拿', '腿部放松'],
    sales: 128,
    status: '启用',
  },
  {
    id: 'TC002',
    name: '针灸理疗套餐',
    category: '针灸理疗',
    price: '¥368',
    originalPrice: '原价 ¥428',
    duration: '60分钟',
    items: ['体针', '艾灸', '拔罐'],
    sales: 95,
    status: '启用',
  },
  {
    id: 'TC003',
    name: '中药熏蒸套餐',
    category: '中药调理',
    price: '¥268',
    originalPrice: '原价 ¥328',
    duration: '45分钟',
    items: ['中药熏蒸', '经络疏通'],
    sales: 76,
    status: '启用',
  },
  {
    id: 'TC004',
    name: '艾灸养生套餐',
    category: '艾灸养生',
    price: '¥198',
    originalPrice: '原价 ¥258',
    duration: '30分钟',
    items: ['艾灸', '穴位按摩'],
    sales: 112,
    status: '启用',
  },
  {
    id: 'TC005',
    name: '四季养生套餐',
    category: '综合调理',
    price: '¥598',
    originalPrice: '原价 ¥698',
    duration: '120分钟',
    items: ['推拿', '艾灸', '中药茶饮'],
    sales: 32,
    status: '停用',
  },
];
