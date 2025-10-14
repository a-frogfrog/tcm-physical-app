import { PageTitle } from '#/components/common';
import {
  EmployeeItem,
  EmployeeList,
  EmployeeSection,
} from '#/features/org/components';
import { ScheduleDay, ScheduleTable } from '#/features/schedule/components';
import { departments } from '#/features/schedule/mock/emp';

export default function ScheduleArrangeRoute() {
  return (
    <>
      <PageTitle title='排班管理' desc='安排技术人员的服务排班计划' />
      <div className='my-4 grid grid-cols-1 gap-4 xl:grid-cols-4'>
        <EmployeeList className='col-span-1'>
          {departments.map((dept) => (
            <EmployeeSection
              key={dept.id}
              name={dept.name}
              number={dept.employees.length}>
              {dept.employees.map((emp) => (
                <EmployeeItem key={emp.id} {...emp} />
              ))}
            </EmployeeSection>
          ))}
        </EmployeeList>

        <div className='col-span-3'>
          <ScheduleTable>
            {['周日', '周一', '周二', '周三', '周四', '周五', '周六'].map(
              (dayOfWeek) => (
                <ScheduleDay
                  key={dayOfWeek}
                  dayOfWeek={dayOfWeek}
                  date={'10.24'}>
                  <EmployeeItem
                    className='border border-gray-200'
                    key={1}
                    {...departments[0].employees[0]}
                  />
                </ScheduleDay>
              ),
            )}
          </ScheduleTable>
        </div>
      </div>
    </>
  );
}
