import moment from 'moment';
// 医生资源数据
export const DOCTOR_RESOURCES = [
  { id: 1, title: '张医师', specialty: '推拿、艾灸' },
  { id: 2, title: '李医师', specialty: '针灸、拔罐' },
  { id: 3, title: '王医师', specialty: '推拿、刮痧' },
];

// 生成日程日期的辅助函数（使用moment）
const createEventDate = (
  month: number,
  day: number,
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number,
) => {
  const year = moment().year();
  return {
    start: moment([year, month - 1, day, startHour, startMinute]).toDate(),
    end: moment([year, month - 1, day, endHour, endMinute]).toDate(),
  };
};

// 日程事件数据
export const DOCTOR_EVENTS = [
  // 张医师的日程
  {
    title: '09:00-12:00 推拿',
    ...createEventDate(11, 30, 9, 0, 12, 0),
    resourceId: 1,
  },
  {
    title: '14:00-17:00 艾灸',
    ...createEventDate(11, 30, 14, 0, 17, 0),
    resourceId: 1,
  },
  {
    title: '10:00-15:00 推拿',
    ...createEventDate(11, 31, 10, 0, 15, 0),
    resourceId: 1,
  },
  {
    title: '全天休息',
    ...createEventDate(11, 2, 0, 0, 23, 59),
    resourceId: 1,
    allDay: true,
  },

  // 李医师的日程
  {
    title: '14:00-17:00 针灸',
    ...createEventDate(11, 31, 14, 0, 17, 0),
    resourceId: 2,
  },
  {
    title: '09:00-12:00 拔罐',
    ...createEventDate(11, 1, 9, 0, 12, 0),
    resourceId: 2,
  },
  {
    title: '全天休息',
    ...createEventDate(11, 3, 0, 0, 23, 59),
    resourceId: 2,
    allDay: true,
  },

  // 王医师的日程
  {
    title: '10:00-15:00 推拿',
    ...createEventDate(11, 30, 10, 0, 15, 0),
    resourceId: 3,
  },
  {
    title: '13:00-17:00 刮痧',
    ...createEventDate(11, 1, 13, 0, 17, 0),
    resourceId: 3,
  },
  {
    title: '全天休息',
    ...createEventDate(11, 4, 0, 0, 23, 59),
    resourceId: 3,
    allDay: true,
  },
];
