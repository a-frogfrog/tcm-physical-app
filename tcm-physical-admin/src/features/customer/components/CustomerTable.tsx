import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui';
import { ChevronLeft, ChevronRight, Copy, Eye, Pencil } from 'lucide-react';
import { useState } from 'react';

// Mock data
const customers = [
  {
    name: '王丽娜',
    phone: '138****5678',
    photo: 'https://picsum.photos/200/300',
    memberId: 'C20230567',
    level: '钻石会员',
    total: '¥12,580',
    times: '12次消费',
    lastDate: '2023-06-15',
    lastService: '肩颈理疗',
    health: '颈椎劳损 已调理3个月',
    status: '活跃',
  },
  {
    name: '李明远',
    phone: '139****2345',
    photo: 'https://picsum.photos/200/300',
    memberId: 'C20230421',
    level: '黄金会员',
    total: '¥8,350',
    times: '8次消费',
    lastDate: '2023-06-10',
    lastService: '推拿按摩',
    health: '腰肌劳损 已调理1个月',
    status: '活跃',
  },
];

const CustomerTable = ({ className }: { className?: string }) => {
  const [page, setPage] = useState(1);
  const totalPages = 5;
  const [sort, setSort] = useState('默认排序');

  return (
    <Card className={`rounded-2xl shadow-md ${className}`}>
      <CardContent className='space-y-4 p-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>客户列表</h2>
          <div className='flex space-x-4'>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className='w-[140px]'>
                <SelectValue placeholder='排序方式' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='默认排序'>默认排序</SelectItem>
                <SelectItem value='消费最多'>消费最多</SelectItem>
                <SelectItem value='最近消费'>最近消费</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue='10'>
              <SelectTrigger className='w-[100px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='10'>10条/页</SelectItem>
                <SelectItem value='20'>20条/页</SelectItem>
                <SelectItem value='50'>50条/页</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>客户信息</TableHead>
              <TableHead>会员等级</TableHead>
              <TableHead>累计消费</TableHead>
              <TableHead>最近消费</TableHead>
              <TableHead>健康状况</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((c, i) => (
              <TableRow key={i}>
                <TableCell>
                  <article className='flex items-center gap-2'>
                    <Avatar className='h-10 w-10 rounded-md'>
                      <AvatarImage src={c.photo} alt={c.name} />
                      <AvatarFallback>{c.name}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                      <span className='font-medium'>{c.name}</span>
                      <span className='text-sm text-gray-500'>{c.phone}</span>
                      <span className='text-xs text-gray-400'>
                        会员号: {c.memberId}
                      </span>
                    </div>
                  </article>
                </TableCell>
                <TableCell>{c.level}</TableCell>
                <TableCell>
                  <div className='flex flex-col'>
                    <span>{c.total}</span>
                    <span className='text-xs text-gray-500'>{c.times}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex flex-col'>
                    <span>{c.lastDate}</span>
                    <span className='text-xs text-gray-500'>
                      {c.lastService}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{c.health}</TableCell>
                <TableCell>
                  {c.status === '活跃' ? (
                    <Badge className='bg-green-500'>活跃</Badge>
                  ) : (
                    <Badge variant='secondary'>非活跃</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className='flex space-x-2'>
                    <Button size='icon' variant='ghost'>
                      <Eye className='h-4 w-4' />
                    </Button>
                    <Button size='icon' variant='ghost'>
                      <Pencil className='h-4 w-4' />
                    </Button>
                    <Button size='icon' variant='ghost'>
                      <Copy className='h-4 w-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* 分页器 */}
        <div className='flex items-center justify-between pt-4'>
          <span className='text-sm text-gray-500'>
            显示 1 到 5 条，共 248 条记录
          </span>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={page === i + 1 ? 'default' : 'outline'}
                size='sm'
                onClick={() => setPage(i + 1)}>
                {i + 1}
              </Button>
            ))}
            <Button
              variant='outline'
              size='icon'
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerTable;
