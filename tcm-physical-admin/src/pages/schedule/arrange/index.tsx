import { PageTitle } from '#/components/common';
import CalendarControl from './CalendarControl';
import ScheduleTable from './ScheduleTable';
import ServiceLegend from './ServiceLegend';

export default function ScheduleArrangePage() {
  return (
    <>
      <PageTitle title='排班管理' desc='安排技术人员的服务排班计划' />
      <CalendarControl className='base-card my-6' />
      <ScheduleTable className='base-card my-6' />
      <ServiceLegend className='base-card my-6' />
    </>
  );
}
