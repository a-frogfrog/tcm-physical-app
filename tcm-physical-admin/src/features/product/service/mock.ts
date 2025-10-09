import type { ProductCardProps } from './components';

export const productCardData: ProductCardProps[] = [
  {
    title: '中医针灸理疗套餐',
    price: 298,
    duration: '30分钟/次',
    features: ['中医师坐诊', '可医保'],
    description:
      '针对颈肩腰腿痛、失眠等症状，通过传统针灸技法调节经络气血，搭配专业穴位按摩，缓解不适症状。',
    imageUrl: 'https://picsum.photos/id/235/800/400', // 山景图
    status: '正常运营',
    servicesCount: 128,
    rating: 4.9,
    lastUpdated: '2024-05-10',
  },
  {
    title: '经络养生理疗 60分钟',
    price: 499,
    duration: '60分钟/次',
    features: ['资深技师', '非医保'],
    description:
      '全身经络疏通，配合草药热敷，帮助活血化瘀、放松肌肉、改善亚健康状态。',
    imageUrl: 'https://picsum.photos/id/235/800/400', // 按摩图
    status: '正常运营',
    servicesCount: 350,
    rating: 4.8,
    lastUpdated: '2024-05-01',
  },
  {
    title: '艾灸温补调理',
    price: 188,
    duration: '45分钟/次',
    features: ['专业艾灸师', '女士优先'],
    description:
      '针对宫寒、体寒、脾胃虚弱等问题，采用道地陈艾，温补元气，调和阴阳。',
    imageUrl: 'https://picsum.photos/id/235/800/400', // 艾灸或香薰图
    status: '休息中', // 演示“休息中”状态
    servicesCount: 75,
    rating: 4.7,
    lastUpdated: '2024-04-25',
  },
  {
    title: '拔罐祛湿排毒',
    price: 99,
    duration: '20分钟/次',
    features: ['无需预约', '快速见效'],
    description:
      '火罐留罐，有效祛除体内湿气、寒气，缓解肌肉酸痛，是夏日祛湿佳选。',
    imageUrl: 'https://picsum.photos/id/235/800/400', // 拔罐相关图
    status: '正常运营',
    servicesCount: 890,
    rating: 4.5,
    lastUpdated: '2024-05-15',
  },
  {
    title: '小儿推拿（积食专治）',
    price: 150,
    duration: '25分钟/次',
    features: ['儿推专科', '家长陪同'],
    description:
      '纯手法推拿，针对儿童食欲不振、积食、夜啼等常见问题，安全无副作用。',
    imageUrl: 'https://picsum.photos/id/235/800/400', // 儿童相关图
    status: '正常运营',
    servicesCount: 220,
    rating: 5.0,
    lastUpdated: '2024-05-12',
  },
  {
    title: '足底反射区按摩',
    price: 120,
    duration: '35分钟/次',
    features: ['舒缓疲劳', '足浴赠送'],
    description:
      '刺激足底反射区，改善血液循环，缓解全身疲劳，赠送中药足浴一份。',
    imageUrl: 'https://picsum.photos/id/235/800/400', // 足疗相关图
    status: '休息中',
    servicesCount: 40,
    rating: 4.6,
    lastUpdated: '2024-03-20',
  },
  {
    title: '特惠 | 肩颈放松套餐',
    price: 88,
    duration: '20分钟/次',
    features: ['体验价', '仅限首单'],
    description: '快速缓解办公室人群的肩颈僵硬和疼痛，适合午休时间快速放松。',
    imageUrl: 'https://picsum.photos/id/235/800/400', // 肩颈放松图
    status: '已下架', // 演示“已下架”状态
    servicesCount: 1500,
    rating: 4.9,
    lastUpdated: '2024-01-01',
  },
];
