import { PageTitle } from '#/components/common';
import {
  DraggableEmployeeItem,
  EmployeeItem,
  EmployeeList,
  EmployeeSection,
} from '#/features/org/components';
import {
  DroppableScheduleDay,
  ScheduleTable,
} from '#/features/schedule/components';
import { departments } from '#/features/schedule/mock/emp';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';

interface Schedule {
  [dayId: string]: string | null; // Key: DroppableScheduleDay 的 droppableId (如 '周日'), Value: DraggableEmployeeItem 的 draggableId (员工ID) 或 null
}
const initialSchedule: Schedule = {
  周日: null,
  周一: null,
  周二: null,
  周三: null,
  周四: null,
  周五: null,
  周六: null,
};

export default function ScheduleArrangeRoute() {
  const [schedule, setSchedule] = useState<Schedule>(initialSchedule);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over?.id) {
      const employeeId = active.id.toString(); // 员工ID (draggableId)
      const dayId = over.id.toString(); // 目标日期的ID (droppableId)

      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        [dayId]: employeeId,
      }));
    }
  };
  return (
    <>
      <PageTitle title='排班管理' desc='安排技术人员的服务排班计划' />
      <DndContext onDragEnd={handleDragEnd}>
        <div className='my-4 grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4'>
          <EmployeeList className='col-span-1'>
            {departments.map((dept) => (
              <EmployeeSection
                key={dept.id}
                name={dept.name}
                number={dept.employees.length}>
                {dept.employees.map((emp) => {
                  return (
                    <DraggableEmployeeItem
                      className='bg-white'
                      draggableId={emp.id}
                      key={emp.id}
                      {...emp}
                    />
                  );
                })}
              </EmployeeSection>
            ))}
          </EmployeeList>

          <div className='col-span-2 xl:col-span-3'>
            <ScheduleTable>
              {['周日', '周一', '周二', '周三', '周四', '周五', '周六'].map(
                (dayOfWeek) => {
                  const assignedEmployeeId = schedule[dayOfWeek];
                  console.log(assignedEmployeeId);
                  // 2. 找到该员工的完整数据 (需要一个辅助函数或数据结构)
                  // 假设我们有一个 findEmployeeById 函数
                  const findEmployeeById = (id: string) => {
                    for (const dept of departments) {
                      const emp = dept.employees.find((e) => e.id === id);
                      if (emp) return emp;
                    }
                    return null;
                  };
                  const assignedEmployee = assignedEmployeeId
                    ? findEmployeeById(assignedEmployeeId)
                    : null;

                  return (
                    <DroppableScheduleDay
                      droppableId={dayOfWeek}
                      key={dayOfWeek}
                      dayOfWeek={dayOfWeek}
                      date={'10.24'}>
                      {/* 3. 如果找到了已分配的员工，则渲染其 EmployeeItem */}
                      {assignedEmployee ? (
                        <EmployeeItem
                          className='border border-gray-200'
                          key={assignedEmployee.id}
                          {...assignedEmployee}
                        />
                      ) : null}
                    </DroppableScheduleDay>
                  );
                },
              )}
            </ScheduleTable>
          </div>
        </div>
      </DndContext>
    </>
  );
}
