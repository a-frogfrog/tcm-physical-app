import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  TableHead,
} from '#/components/ui';
import { useProductPackageData } from './useProductPackage';

const PackageTableFilter = () => {
  return (
    <div className='mb-4 flex items-center justify-between'>
      <h3 className='text-lg font-semibold'>套餐列表</h3>
      <div className='flex items-center space-x-3'>
        <Select>
          <SelectTrigger className='w-32'>
            <SelectValue placeholder='所有分类' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='massage'>推拿按摩</SelectItem>
            <SelectItem value='acupuncture'>针灸理疗</SelectItem>
            <SelectItem value='herbal'>中药调理</SelectItem>
            <SelectItem value='moxibustion'>艾灸养生</SelectItem>
            <SelectItem value='comprehensive'>综合调理</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className='w-32'>
            <SelectValue placeholder='所有状态' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='enabled'>启用</SelectItem>
            <SelectItem value='disabled'>停用</SelectItem>
          </SelectContent>
        </Select>
        <Button variant='outline'>筛选</Button>
        <Button variant='outline'>导出</Button>
      </div>
    </div>
  );
};

const PackageTablePagination = () => {
  return (
    <Pagination className='w-full justify-end'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href='#' />
        </PaginationItem>
        {/* <PaginationLogic /> */}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href='#' />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default function PackageTable() {
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 5;
  // const totalItems = 24;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 分页逻辑，这里简化处理，实际可结合后端数据分页
  const { packageTableData } = useProductPackageData();

  return (
    <div className='w-full'>
      <PackageTableFilter />
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            <TableHead>套餐名称</TableHead>
            <TableHead>分类</TableHead>
            <TableHead>价格</TableHead>
            <TableHead>时长</TableHead>
            <TableHead>包含项目</TableHead>
            <TableHead>销量</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packageTableData.map((pkg) => (
            <TableRow key={pkg.id}>
              <TableCell>
                <div className='flex items-center space-x-2'>
                  {/* 这里可根据实际情况添加套餐图片 */}
                  <span>{pkg.name}</span>
                  <span className='text-sm text-gray-500'>ID: {pkg.id}</span>
                </div>
              </TableCell>
              <TableCell>{pkg.category}</TableCell>
              <TableCell>
                <div>
                  <span>{pkg.price}</span>
                  <span className='ml-1 text-sm text-gray-500'>
                    {pkg.originalPrice}
                  </span>
                </div>
              </TableCell>
              <TableCell>{pkg.duration}</TableCell>
              <TableCell>
                {pkg.items.map((item, idx) => (
                  <span
                    key={idx}
                    className='mb-1 mr-1 inline-block rounded bg-gray-100 px-2 py-1 text-xs'>
                    {item}
                  </span>
                ))}
              </TableCell>
              <TableCell>{pkg.sales}</TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    pkg.status === '启用'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                  {pkg.status}
                </span>
              </TableCell>
              <TableCell>
                <div className='flex space-x-2'>
                  <Button variant='link' size='sm'>
                    编辑
                  </Button>
                  <Button variant='link' size='sm'>
                    详情
                  </Button>
                  <Button
                    variant='link'
                    size='sm'
                    className={
                      pkg.status === '启用' ? 'text-red-500' : 'text-green-500'
                    }>
                    {pkg.status === '启用' ? '停用' : '启用'}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PackageTablePagination />
    </div>
  );
}
