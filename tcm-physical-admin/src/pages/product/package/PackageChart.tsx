import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: '1月',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '2月',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '3月',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '4月',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '5月',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '6月',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '7月',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export default function PackageChart() {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='uv'
          stackId='1'
          stroke='#8884d8'
          fill='#8884d8'
        />
        <Area
          type='monotone'
          dataKey='pv'
          stackId='1'
          stroke='#82ca9d'
          fill='#82ca9d'
        />
        <Area
          type='monotone'
          dataKey='amt'
          stackId='1'
          stroke='#ffc658'
          fill='#ffc658'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
