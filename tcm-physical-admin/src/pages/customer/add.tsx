import { PageTitle } from '#/components/common';
import { CustomerForm } from '#/features/customer/components';

export default function CustomerAddRoute() {
  return (
    <>
      <PageTitle
        title='新增客户信息'
        desc='添加新客户资料，建立客户档案以便提供个性化中医理疗服务'
      />
      <CustomerForm className='my-6' />
    </>
  );
}
