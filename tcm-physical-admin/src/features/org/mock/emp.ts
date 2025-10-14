import type { Department } from '#/features/org/components';

export const departments: Department[] = [
  {
    id: 1,
    name: '中医科',
    employees: [
      {
        id: '1',
        name: '张明远',
        role: '主任医师',
        avatar: 'https://i.pravatar.cc/100?img=1',
        status: 'online',
      },
      {
        id: '2',
        name: '李淑琴',
        role: '副主任医师',
        avatar: 'https://i.pravatar.cc/100?img=2',
        status: 'online',
      },
      {
        id: '3',
        name: '王建国',
        role: '主治医师',
        avatar: 'https://i.pravatar.cc/100?img=3',
        status: 'away',
      },
      {
        id: '4',
        name: '刘芳华',
        role: '住院医师',
        avatar: 'https://i.pravatar.cc/100?img=4',
        status: 'online',
      },
    ],
  },
  {
    id: 2,
    name: '针灸推拿科',
    employees: [
      {
        id: '5',
        name: '陈志强',
        role: '针灸主治医师',
        avatar: 'https://i.pravatar.cc/100?img=5',
        status: 'online',
      },
      {
        id: '6',
        name: '杨丽娜',
        role: '推拿技师',
        avatar: 'https://i.pravatar.cc/100?img=6',
        status: 'online',
      },
      {
        id: '7',
        name: '赵天明',
        role: '艾灸治疗师',
        avatar: 'https://i.pravatar.cc/100?img=7',
        status: 'offline',
      },
    ],
  },
  {
    id: 3,
    name: '中药房',
    employees: [
      {
        id: '8',
        name: '黄德才',
        role: '中药师',
        avatar: 'https://i.pravatar.cc/100?img=8',
        status: 'online',
      },
      {
        id: '9',
        name: '周小玲',
        role: '中药调剂员',
        avatar: 'https://i.pravatar.cc/100?img=9',
        status: 'away',
      },
    ],
  },
  {
    id: 4,
    name: '康复理疗科',
    employees: [
      {
        id: '10',
        name: '吴秀兰',
        role: '康复治疗师',
        avatar: 'https://i.pravatar.cc/100?img=10',
        status: 'online',
      },
      {
        id: '11',
        name: '郑文彬',
        role: '理疗技师',
        avatar: 'https://i.pravatar.cc/100?img=11',
        status: 'online',
      },
    ],
  },
];
