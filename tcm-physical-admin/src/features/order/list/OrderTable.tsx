import {
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
  Badge,
  Button,
} from '#/components/ui';

type Order = {
  id: string;
  date: string;
  customer: { name: string; phone: string; avatar: string };
  package: string;
  duration: string;
  appointment: string;
  amount: number;
  payment: string;
  status: '待确认' | '已确认' | '已完成' | '已取消';
};

const orders: Order[] = [
  {
    id: 'ORD20230512001',
    date: '2023-05-12',
    customer: {
      name: '李女士',
      phone: '138****5678',
      avatar: '/avatars/frog.jpg',
    },
    package: '全身推拿套餐',
    duration: '90分钟',
    appointment: '2023-05-15 15:00-16:30',
    amount: 298,
    payment: '微信支付',
    status: '待确认',
  },
  {
    id: 'ORD20230512002',
    date: '2023-05-12',
    customer: {
      name: '王先生',
      phone: '139****1234',
      avatar: '/avatars/frog.jpg',
    },
    package: '针灸理疗套餐',
    duration: '60分钟',
    appointment: '2023-05-14 10:00-11:00',
    amount: 368,
    payment: '支付宝',
    status: '已确认',
  },
  {
    id: 'ORD20230511005',
    date: '2023-05-11',
    customer: {
      name: '张女士',
      phone: '136****8901',
      avatar: '/avatars/frog.jpg',
    },
    package: '中药熏蒸套餐',
    duration: '45分钟',
    appointment: '2023-05-12 09:30-10:15',
    amount: 268,
    payment: '现金支付',
    status: '已完成',
  },
];

const OrderTable = ({ className }: { className?: string }) => {
  return (
    <Card className={`w-full shadow-md ${className}`}>
      <CardHeader>
        <CardTitle className='text-lg font-bold'>订单列表</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单编号</TableHead>
              <TableHead>客户信息</TableHead>
              <TableHead>套餐名称</TableHead>
              <TableHead>预约时间</TableHead>
              <TableHead>金额</TableHead>
              <TableHead>支付方式</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className='flex flex-col'>
                    <span className='font-medium'>{order.id}</span>
                    <span className='text-xs text-gray-500'>{order.date}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <img
                      src={order.customer.avatar}
                      alt={order.customer.name}
                      width={32}
                      height={32}
                      className='rounded-full'
                    />
                    <div className='flex flex-col'>
                      <span>{order.customer.name}</span>
                      <span className='text-xs text-gray-500'>
                        {order.customer.phone}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex flex-col'>
                    <span>{order.package}</span>
                    <span className='text-xs text-gray-500'>
                      {order.duration}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{order.appointment}</TableCell>
                <TableCell>¥{order.amount.toFixed(2)}</TableCell>
                <TableCell>{order.payment}</TableCell>
                <TableCell>
                  {order.status === '待确认' && (
                    <Badge
                      variant='secondary'
                      className='bg-yellow-100 text-yellow-600'>
                      待确认
                    </Badge>
                  )}
                  {order.status === '已确认' && (
                    <Badge
                      variant='secondary'
                      className='bg-green-100 text-green-600'>
                      已确认
                    </Badge>
                  )}
                  {order.status === '已完成' && (
                    <Badge
                      variant='secondary'
                      className='bg-blue-100 text-blue-600'>
                      已完成
                    </Badge>
                  )}
                  {order.status === '已取消' && (
                    <Badge
                      variant='secondary'
                      className='bg-red-100 text-red-600'>
                      已取消
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className='flex space-x-2'>
                    <Button variant='outline' size='sm'>
                      详情
                    </Button>
                    <Button variant='destructive' size='sm'>
                      取消
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrderTable;
