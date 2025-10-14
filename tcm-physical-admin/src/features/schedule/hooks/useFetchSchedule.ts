import { useState } from 'react';

export function useFetchSchedule() {}

export interface Schedule {
  [dayId: string]: string | null; // Key: DroppableScheduleDay 的 droppableId (如 '周日'), Value: DraggableEmployeeItem 的 draggableId (员工ID) 或 null
}
export function useScheduleDay() {
  const initialSchedule: Schedule = {
    周日: null,
    周一: null,
    周二: null,
    周三: null,
    周四: null,
    周五: null,
    周六: null,
  };
  const [schedule, setSchedule] = useState<Schedule>(initialSchedule);
  return {
    data: schedule,
    mutate: setSchedule,
  };
}
