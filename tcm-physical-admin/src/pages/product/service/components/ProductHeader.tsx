import { PageTitle } from '#/components/common';
import { Button } from '#/components/ui/button';

const ProductHeader = () => {
  return (
    <PageTitle
      title='中医理疗产品列表'
      desc='管理中医理疗项目、套餐及相关产品信息'
      actions={
        <Button className='ml-auto h-10 w-22 text-base'>新增产品</Button>
      }
    />
  );
};

export { ProductHeader };
