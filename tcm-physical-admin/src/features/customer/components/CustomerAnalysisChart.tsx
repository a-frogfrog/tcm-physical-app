import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const data = [
  { category: '新客户', count: 420 },
  { category: '回头客', count: 280 },
  { category: '潜在客户', count: 350 },
  { category: '流失客户', count: 120 },
  { category: '高价值客户', count: 190 },
];

function CustomerAnalysisChart() {
  return (
    <motion.div
      className='flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-md'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
      {/* 标题 */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='flex items-center gap-2 text-xl font-semibold text-gray-800'>
            <Users className='text-green-500' size={22} />
            客户分析
          </h2>
          <p className='mt-1 text-sm text-gray-500'>按客户类型分类统计</p>
        </div>
      </div>

      {/* 图表区域 */}
      <div className='h-72 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
            barCategoryGap={30}>
            <defs>
              <linearGradient id='colorCustomer' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#22c55e' stopOpacity={0.9} />
                <stop offset='95%' stopColor='#86efac' stopOpacity={0.3} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
            <XAxis
              dataKey='category'
              tick={{ fill: '#6b7280', fontSize: 13 }}
              axisLine={false}
            />
            <YAxis tick={{ fill: '#6b7280' }} axisLine={false} />
            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.04)' }}
              contentStyle={{
                borderRadius: '0.75rem',
                borderColor: '#f3f4f6',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Bar
              dataKey='count'
              name='客户数量'
              fill='url(#colorCustomer)'
              radius={[10, 10, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export { CustomerAnalysisChart };
