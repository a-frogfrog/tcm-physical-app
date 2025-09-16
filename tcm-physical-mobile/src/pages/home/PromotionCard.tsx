import { Button } from '#/components/ui';
import { motion } from 'motion/react';

const PromotionCard = () => {
  return (
    <div className='mx-auto w-full max-w-md bg-gray-50'>
      {/* 顶部卡片 */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='relative overflow-hidden rounded-b-3xl bg-green-700 px-6 py-8 text-white'>
        {/* 标题 */}
        <h2 className='text-2xl font-bold leading-snug'>
          传承中医智慧
          <br />
          推广健康赚佣金
        </h2>

        {/* 描述 */}
        <p className='mt-3 text-sm opacity-90'>
          分享专业中医服务，帮助他人获得健康，同时轻松赚取丰厚佣金
        </p>

        {/* 按钮 */}
        <div className='mt-6 flex flex-col gap-3'>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button className='w-full rounded-full bg-green-50 text-green-700 hover:bg-green-100'>
              开始推广
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button className='w-full rounded-full hover:bg-green-100'>
              预约服务
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* 数据统计区块 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='-mt-3 grid grid-cols-2 gap-y-6 rounded-t-3xl bg-white px-6 py-6 text-center'>
        <div>
          <p className='text-xl font-bold text-green-700'>¥12,580</p>
          <p className='text-sm text-gray-600'>累计佣金</p>
        </div>
        <div>
          <p className='text-xl font-bold text-green-700'>328</p>
          <p className='text-sm text-gray-600'>推广订单</p>
        </div>
        <div>
          <p className='text-xl font-bold text-green-700'>86</p>
          <p className='text-sm text-gray-600'>本月新增</p>
        </div>
        <div>
          <p className='text-xl font-bold text-green-700'>156</p>
          <p className='text-sm text-gray-600'>我的团队</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PromotionCard;
