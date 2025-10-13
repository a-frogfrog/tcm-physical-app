import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

function BestSellerCard() {
  return (
    <motion.div
      className='flex items-center justify-between rounded-2xl bg-white p-6 shadow-md'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}>
      {/* 左侧文字内容 */}
      <div className='flex flex-col gap-2'>
        <motion.h2
          className='text-xl font-semibold text-gray-800'
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}>
          恭喜你，小王！🎉
        </motion.h2>

        <p className='text-sm text-gray-500'>本月最佳销售员</p>

        <motion.p
          className='mt-2 text-3xl font-bold text-purple-600'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}>
          ¥42.8k
        </motion.p>

        <p className='mt-1 text-sm text-gray-500'>已达成目标的 78% 🚀</p>

        <motion.button
          className='mt-4 w-fit rounded-lg bg-purple-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-purple-700'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          查看销售详情
        </motion.button>
      </div>

      {/* 右侧奖杯 */}
      <motion.div
        className='text-yellow-400'
        initial={{ rotate: -10, opacity: 0, y: 20 }}
        animate={{ rotate: 0, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}>
        <Trophy
          size={100}
          strokeWidth={1.5}
          className='fill-yellow-400/30 text-yellow-500'
        />
      </motion.div>
    </motion.div>
  );
}

export { BestSellerCard };
