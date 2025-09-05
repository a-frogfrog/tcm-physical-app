import { Button } from '#/components/ui/button';

const ProductHeader = () => {
  return (
    <section className='flex items-center justify-end flex-wrap'>
      <article className='flex-1'>
        <h1 className='text-[clamp(1.25rem,3vw,1.75rem)] font-bold '>
          中医理疗产品列表
        </h1>
        <p className='text-gray-500 mt-1'>
          管理中医理疗项目、套餐及相关产品信息
        </p>
      </article>

      <div>
        <Button className='ml-auto h-10 w-22 text-base'>新增产品</Button>
      </div>
    </section>
  );
};

export { ProductHeader };
