import { PageTitle } from '#/components/common';
import Calendar from './modules/Calendar';

export default function ScheduleArrangePage() {
  return (
    <>
      <PageTitle title='排班管理' desc='安排技术人员的服务排班计划' />
      <Calendar className='base-card my-6' />
    </>
  );
}
