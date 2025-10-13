import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const data = [
  { month: '1月', appointments: 320, revenue: 8000 },
  { month: '2月', appointments: 410, revenue: 9500 },
  { month: '3月', appointments: 380, revenue: 9100 },
  { month: '4月', appointments: 460, revenue: 10400 },
  { month: '5月', appointments: 520, revenue: 11800 },
  { month: '6月', appointments: 610, revenue: 13200 },
];

function TrendsChart() {
  return (
    <motion.div
      className='flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-md'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
      {/* 标题区 */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='flex items-center gap-2 text-xl font-semibold text-gray-800'>
            <TrendingUp className='text-purple-500' size={22} />
            预约与收入趋势
          </h2>
          <p className='mt-1 text-sm text-gray-500'>近 6 个月趋势变化</p>
        </div>
      </div>

      {/* 图表区 */}
      <div className='h-72 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient
                id='colorAppointments'
                x1='0'
                y1='0'
                x2='0'
                y2='1'>
                <stop offset='5%' stopColor='#a855f7' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#a855f7' stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id='colorRevenue' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#3b82f6' stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
            <XAxis dataKey='month' tick={{ fill: '#6b7280' }} />
            <YAxis tick={{ fill: '#6b7280' }} />
            <Tooltip
              contentStyle={{
                borderRadius: '0.75rem',
                borderColor: '#f3f4f6',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Line
              type='monotone'
              dataKey='appointments'
              name='预约量'
              stroke='#a855f7'
              strokeWidth={3}
              fillOpacity={1}
              fill='url(#colorAppointments)'
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type='monotone'
              dataKey='revenue'
              name='收入'
              stroke='#3b82f6'
              strokeWidth={3}
              fillOpacity={1}
              fill='url(#colorRevenue)'
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export { TrendsChart };
