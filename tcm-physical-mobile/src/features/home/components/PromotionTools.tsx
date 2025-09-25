import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui';
import { BarChart2, FileText, QrCode, Link } from 'lucide-react';

type ToolItem = {
  label: string;
  icon: React.ReactNode;
  bgColor: string;
};

const tools: ToolItem[] = [
  {
    label: '推广链接',
    icon: <Link className='h-6 w-6 text-blue-600' />,
    bgColor: 'bg-blue-100',
  },
  {
    label: '推广海报',
    icon: <QrCode className='h-6 w-6 text-green-600' />,
    bgColor: 'bg-green-100',
  },
  {
    label: '推广文案',
    icon: <FileText className='h-6 w-6 text-yellow-600' />,
    bgColor: 'bg-yellow-100',
  },
  {
    label: '数据报表',
    icon: <BarChart2 className='h-6 w-6 text-purple-600' />,
    bgColor: 'bg-purple-100',
  },
];

export default function PromotionTools() {
  return (
    <div className='px-2'>
      <Card className='mx-auto my-2 w-full max-w-md rounded-2xl shadow-md'>
        <CardHeader>
          <CardTitle className='text-lg font-bold'>推广工具</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-4 gap-4 text-center'>
            {tools.map((tool, idx) => (
              <div key={idx} className='flex flex-col items-center space-y-2'>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${tool.bgColor}`}>
                  {tool.icon}
                </div>
                <p className='text-sm text-gray-700'>{tool.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
