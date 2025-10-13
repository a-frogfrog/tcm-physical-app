import { motion } from 'framer-motion';
import {
  PieChart,
  Users,
  Laptop,
  DollarSign,
  MoreVertical,
} from 'lucide-react';

function TransactionsCard() {
  const stats = [
    {
      icon: <PieChart size={24} />,
      title: '销售额',
      value: '245k',
      color: 'bg-purple-500',
    },
    {
      icon: <Users size={24} />,
      title: '客户数',
      value: '12.5k',
      color: 'bg-green-500',
    },
    {
      icon: <Laptop size={24} />,
      title: '产品数量',
      value: '1.54k',
      color: 'bg-yellow-400',
    },
    {
      icon: <DollarSign size={24} />,
      title: '收入',
      value: '$88k',
      color: 'bg-sky-500',
    },
  ];

  return (
    <motion.div
      className='flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-md'
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}>
      {/* 标题区 */}
      <div className='flex items-start justify-between'>
        <div>
          <h2 className='text-2xl font-semibold text-gray-800'>交易统计</h2>
          <p className='mt-1 text-gray-500'>
            总增长 <span className='font-semibold text-gray-800'>48.5%</span> 😎
            本月
          </p>
        </div>
        <MoreVertical className='text-gray-400' />
      </div>

      {/* 数据区 */}
      <div className='flex flex-wrap justify-between gap-6'>
        {stats.map((item, i) => (
          <motion.div
            key={item.title}
            className='flex items-center gap-3'
            initial='hidden'
            animate='visible'
            custom={i}>
            <div className={`${item.color} rounded-xl p-3 text-white`}>
              {item.icon}
            </div>
            <div>
              <p className='text-sm text-gray-500'>{item.title}</p>
              <motion.p
                className='text-xl font-semibold text-gray-800'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}>
                {item.value}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export { TransactionsCard };
