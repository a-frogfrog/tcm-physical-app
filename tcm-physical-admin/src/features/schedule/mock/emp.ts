import type { Department } from '#/features/org/components';

export const departments: Department[] = [
  {
    id: 1,
    name: '技术部',
    employees: [
      {
        id: '1',
        name: '王小明',
        role: '前端开发',
        avatar: 'https://i.pravatar.cc/100?img=1',
        status: 'online',
      },
      {
        id: '2',
        name: '李小华',
        role: '后端开发',
        avatar: 'https://i.pravatar.cc/100?img=2',
        status: 'online',
      },
      {
        id: '3',
        name: '张小红',
        role: 'UI设计师',
        avatar: 'https://i.pravatar.cc/100?img=3',
        status: 'away',
      },
      {
        id: '4',
        name: '赵小刚',
        role: '测试工程师',
        avatar: 'https://i.pravatar.cc/100?img=4',
        status: 'online',
      },
      {
        id: '5',
        name: '陈小丽',
        role: '产品经理',
        avatar: 'https://i.pravatar.cc/100?img=5',
        status: 'offline',
      },
    ],
  },
  {
    id: 2,
    name: '市场部',
    employees: [
      {
        id: '6',
        name: '刘大强',
        role: '市场总监',
        avatar: 'https://i.pravatar.cc/100?img=6',
        status: 'online',
      },
      {
        id: '7',
        name: '黄小芳',
        role: '市场专员',
        avatar: 'https://i.pravatar.cc/100?img=7',
        status: 'online',
      },
    ],
  },
  {
    id: 3,
    name: '销售部',
    employees: [
      {
        id: '8',
        name: '吴大明',
        role: '销售经理',
        avatar: 'https://i.pravatar.cc/100?img=8',
        status: 'away',
      },
    ],
  },
];
