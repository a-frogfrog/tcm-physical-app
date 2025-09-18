export type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number; // minutes
  img: string;
};

export type BookingInfo = {
  bookingId?: string;
  serviceId?: string;
  date?: string; // ISO YYYY-MM-DD
  time?: string; // e.g. "09:00 - 09:30"
};

export const timeSlots = [
  '09:00 - 09:30',
  '09:30 - 10:00',
  '10:00 - 10:30',
  '10:30 - 11:00',
  '11:00 - 11:30',
  '11:30 - 12:00',
  // lunch block - not selectable
  '13:30 - 14:00',
  '14:00 - 14:30',
  '14:30 - 15:00',
  '15:00 - 15:30',
  '15:30 - 16:00',
  '16:00 - 16:30',
  '16:30 - 17:00',
  '17:00 - 17:30',
];

export const dateItems = () => {
  const arr: {
    iso: string;
    labelDay: string;
    dateNum: number;
    monthName: string;
  }[] = [];

  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    arr.push({
      iso,
      labelDay: weekdays[d.getDay()],
      dateNum: d.getDate(),
      monthName: `${d.getMonth() + 1}月`,
    });
  }
  return arr;
};

export const services: Service[] = [
  {
    id: 'acupuncture',
    title: '针灸疗法',
    description: '通过针刺穴位调节气血，缓解疼痛，治疗多种疾病',
    price: 120,
    duration: 30,
    img: 'https://picsum.photos/seed/acupuncture/640/360',
  },
  {
    id: 'tuina',
    title: '推拿按摩',
    description: '运用手法刺激经络穴位，疏通经络，调和气血',
    price: 100,
    duration: 45,
    img: 'https://picsum.photos/seed/tuina/640/360',
  },
  {
    id: 'herbal',
    title: '中药调理',
    description: '根据体质辨证施治，定制中药方案，调理身体机能',
    price: 150,
    duration: 60,
    img: 'https://picsum.photos/seed/herbal/640/360',
  },
  {
    id: 'moxibustion',
    title: '艾灸疗法',
    description: '通过艾绒燃烧产生的温热刺激穴位，温通经络',
    price: 90,
    duration: 30,
    img: 'https://picsum.photos/seed/moxibustion/640/360',
  },
];
