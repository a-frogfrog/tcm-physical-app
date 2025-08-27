import { Button } from '#/components/ui/button';

const ProductHeader = () => {
  return (
    <section className='flex items-center'>
      <div>
        <h2 className='text-[clamp(1.25rem,3vw,1.75rem)] font-bold '>
          中医理疗产品列表
        </h2>
        <p className='text-gray-500 mt-1'>
          管理中医理疗项目、套餐及相关产品信息
        </p>
      </div>

      <Button className='ml-auto h-12 w-24 text-lg'>新增产品</Button>
    </section>
  );
};

export { ProductHeader };
