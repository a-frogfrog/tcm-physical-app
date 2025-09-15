import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { day: '周一', orderCount: 20, orderAmount: 5000 },
  { day: '周二', orderCount: 24, orderAmount: 6200 },
  { day: '周三', orderCount: 22, orderAmount: 5900 },
  { day: '周四', orderCount: 29, orderAmount: 7300 },
  { day: '周五', orderCount: 28, orderAmount: 7100 },
  { day: '周六', orderCount: 41, orderAmount: 12800 },
  { day: '周日', orderCount: 35, orderAmount: 11000 },
];

const OrderTrendChart = () => {
  return (
    <Card className='w-full shadow-md'>
      <CardHeader>
        <CardTitle className='text-lg font-bold'>订单趋势分析</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[260px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={data}
              margin={{ top: 20, right: 40, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
              <XAxis dataKey='day' />
              <YAxis
                yAxisId='left'
                orientation='left'
                label={{
                  value: '订单数量',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <YAxis
                yAxisId='right'
                orientation='right'
                label={{
                  value: '订单金额 (元)',
                  angle: -90,
                  position: 'insideRight',
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId='left'
                type='monotone'
                dataKey='orderCount'
                stroke='#8B5CF6' // 紫色
                activeDot={{ r: 6 }}
                name='订单数量'
              />
              <Line
                yAxisId='right'
                type='monotone'
                dataKey='orderAmount'
                stroke='#10B981' // 绿色
                activeDot={{ r: 6 }}
                name='订单金额'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTrendChart;
