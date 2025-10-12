import { PageTitle } from '#/components/common';
import {
  CalendarControl,
  ScheduleTable,
  ServiceLegend,
} from '#/features/schedule/components';

export default function ScheduleArrangeRoute() {
  return (
    <>
      <PageTitle title='排班管理' desc='安排技术人员的服务排班计划' />
      <CalendarControl className='base-card my-6' />
      <ScheduleTable className='base-card my-6' />
      <ServiceLegend className='base-card my-6' />
    </>
  );
}
