import {
  Checkbox,
  Input,
  Button,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '#/components/ui';
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// 推广活动类型定义
type PromotionType = '折扣优惠' | '套餐促销' | '新项目推广' | '会员活动';
type PromotionStatus = '进行中' | '已结束';

// 推广活动数据接口
interface Promotion {
  id: string;
  name: string;
  type: PromotionType;
  startDate: string;
  endDate: string;
  status: PromotionStatus;
  participants: number;
  imageUrl: string;
}

// 模拟数据
const promotions: Promotion[] = [
  {
    id: 'PROM2023001',
    name: '春季针灸调理特惠',
    type: '折扣优惠',
    startDate: '2023-03-01',
    endDate: '2023-04-30',
    status: '进行中',
    participants: 128,
    imageUrl: 'https://picsum.photos/id/237/60/60',
  },
  {
    id: 'PROM2023002',
    name: '中医推拿疗程套餐',
    type: '套餐促销',
    startDate: '2023-02-15',
    endDate: '2023-03-15',
    status: '已结束',
    participants: 96,
    imageUrl: 'https://picsum.photos/id/119/60/60',
  },
  {
    id: 'PROM2023003',
    name: '艾草熏蒸养生体验',
    type: '新项目推广',
    startDate: '2023-04-01',
    endDate: '2023-05-15',
    status: '进行中',
    participants: 75,
    imageUrl: 'https://picsum.photos/id/225/60/60',
  },
  {
    id: 'PROM2023004',
    name: '春季会员专享福利',
    type: '会员活动',
    startDate: '2023-03-15',
    endDate: '2023-04-15',
    status: '进行中',
    participants: 52,
    imageUrl: 'https://picsum.photos/id/292/60/60',
  },
  {
    id: 'PROM2023005',
    name: '拔罐除湿特惠活动',
    type: '折扣优惠',
    startDate: '2023-01-01',
    endDate: '2023-01-31',
    status: '已结束',
    participants: 68,
    imageUrl: 'https://picsum.photos/id/325/60/60',
  },
];

// 获取类型标签样式
const getTypeBadgeStyle = (type: PromotionType) => {
  switch (type) {
    case '折扣优惠':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    case '套餐促销':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
    case '新项目推广':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
    case '会员活动':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
  }
};

// 获取状态标签样式
const getStatusBadgeStyle = (status: PromotionStatus) => {
  switch (status) {
    case '进行中':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
    case '已结束':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
  }
};

export default function PromotionTable({ className }: { className?: string }) {
  return (
    <Card className={`w-full overflow-hidden ${className}`}>
      <CardHeader className='flex flex-row items-center justify-between border-b'>
        <CardTitle className='text-xl font-semibold'>推广列表</CardTitle>
        <div className='relative w-64'>
          <Search className='absolute top-2.5 left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
          <Input
            type='search'
            placeholder='搜索推广...'
            className='bg-gray-50 pl-9 dark:bg-gray-800'
          />
        </div>
      </CardHeader>

      <CardContent className='p-0'>
        <Table>
          <TableHeader className='bg-gray-50 dark:bg-gray-800'>
            <TableRow>
              <TableHead className='w-12'>
                <Checkbox aria-label='Select all' />
              </TableHead>
              <TableHead className='w-[250px]'>
                <div className='flex cursor-pointer items-center gap-1'>
                  推广名称
                  <ChevronDown className='h-4 w-4 opacity-50' />
                </div>
              </TableHead>
              <TableHead>
                <div className='flex cursor-pointer items-center gap-1'>
                  推广类型
                  <ChevronDown className='h-4 w-4 opacity-50' />
                </div>
              </TableHead>
              <TableHead>
                <div className='flex cursor-pointer items-center gap-1'>
                  时间范围
                  <ChevronDown className='h-4 w-4 opacity-50' />
                </div>
              </TableHead>
              <TableHead>
                <div className='flex cursor-pointer items-center gap-1'>
                  状态
                  <ChevronDown className='h-4 w-4 opacity-50' />
                </div>
              </TableHead>
              <TableHead>
                <div className='flex cursor-pointer items-center gap-1'>
                  参与人数
                  <ChevronDown className='h-4 w-4 opacity-50' />
                </div>
              </TableHead>
              <TableHead className='text-right'>操作</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {promotions.map((promotion) => (
              <TableRow
                key={promotion.id}
                className='transition-colors hover:bg-gray-50 dark:hover:bg-gray-800'>
                <TableCell>
                  <Checkbox aria-label={`Select ${promotion.name}`} />
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <img
                      src={promotion.imageUrl}
                      alt={promotion.name}
                      className='h-10 w-10 rounded-md object-cover'
                    />
                    <div>
                      <div className='font-medium'>{promotion.name}</div>
                      <div className='text-sm text-gray-500 dark:text-gray-400'>
                        ID: {promotion.id}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getTypeBadgeStyle(promotion.type)}>
                    {promotion.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <div>{promotion.startDate}</div>
                    <div className='text-sm text-gray-500 dark:text-gray-400'>
                      至 {promotion.endDate}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeStyle(promotion.status)}>
                    <span
                      className={`mr-1 inline-block h-2 w-2 rounded-full ${
                        promotion.status === '进行中'
                          ? 'bg-green-600'
                          : 'bg-red-600'
                      }`}></span>
                    {promotion.status}
                  </Badge>
                </TableCell>
                <TableCell>{promotion.participants}</TableCell>
                <TableCell className='text-right'>
                  <div className='flex items-center justify-end gap-2'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-gray-600 hover:text-blue-600'>
                      <Eye className='h-4 w-4' />
                      <span className='sr-only'>查看</span>
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-gray-600 hover:text-amber-600'>
                      <Pencil className='h-4 w-4' />
                      <span className='sr-only'>编辑</span>
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-gray-600 hover:text-red-600'>
                      <Trash2 className='h-4 w-4' />
                      <span className='sr-only'>删除</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <div className='flex items-center justify-between border-t p-4'>
        <div className='text-sm text-gray-500 dark:text-gray-400'>
          显示1到5条，共24条
        </div>
        <div className='flex items-center gap-1'>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <ChevronLeft className='h-4 w-4' />
            <span className='sr-only'>上一页</span>
          </Button>
          <Button
            variant='default'
            size='icon'
            className='h-8 w-8 bg-gray-900 hover:bg-gray-800'>
            1
          </Button>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            2
          </Button>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            3
          </Button>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            4
          </Button>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            5
          </Button>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <ChevronRight className='h-4 w-4' />
            <span className='sr-only'>下一页</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
