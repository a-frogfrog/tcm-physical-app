import { useState } from 'react';
import { Card, CardContent, Button } from '#/components/ui';
import { cn } from '#/lib/utils';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type TooltipItem,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type TabKey = 'month' | 'quarter' | 'year';

export default function RevenueChart() {
  const [activeTab, setActiveTab] = useState<TabKey>('month');
  const [year, setYear] = useState('2023');

  // 模拟数据
  const dataMap = {
    month: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      values: [1200, 1800, 1500, 2100, 2500, 3400],
    },
    quarter: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      values: [4500, 5600, 6200, 7100],
    },
    year: {
      labels: ['2021', '2022', '2023'],
      values: [12000, 16800, 19800],
    },
  };

  const chartData = {
    labels: dataMap[activeTab].labels,
    datasets: [
      {
        label: '收益 (¥)',
        data: dataMap[activeTab].values,
        backgroundColor: 'rgba(34, 197, 94, 0.7)', // Tailwind green-500
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx: TooltipItem<'bar'>) => `¥${ctx.raw}` },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number | string) => `¥${value}`,
        },
      },
    },
  };

  return (
    <Card className='p-4'>
      <CardContent>
        <h2 className='mb-4 text-lg font-bold'>收益趋势</h2>

        {/* Tabs & Year Selector */}
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex space-x-2'>
            {[
              { key: 'month', label: '月度' },
              { key: 'quarter', label: '季度' },
              { key: 'year', label: '年度' },
            ].map((tab) => (
              <Button
                key={tab.key}
                variant='outline'
                className={cn(
                  'rounded-full px-4 py-1',
                  activeTab === tab.key
                    ? 'bg-green-700 text-white'
                    : 'bg-white text-gray-700',
                )}
                onClick={() => setActiveTab(tab.key as TabKey)}>
                {tab.label}
              </Button>
            ))}
          </div>

          {/* 年份选择 */}
          <select
            className='rounded border px-3 py-1 text-sm'
            value={year}
            onChange={(e) => setYear(e.target.value)}>
            <option value='2023'>2023年</option>
            <option value='2022'>2022年</option>
            <option value='2021'>2021年</option>
          </select>
        </div>

        {/* Chart */}
        <Bar data={chartData} options={chartOptions} height={250} />
      </CardContent>
    </Card>
  );
}
