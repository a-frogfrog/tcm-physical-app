import { Button } from '#/components/ui/button';
import { Badge } from '#/components/ui/badge';
import { Checkbox } from '#/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '#/components/ui/pagination';

export interface Product {
  id: number;
  productName: string;
  productInfo: string;
  photo: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  description: string;
}

const ProductPagination = () => {
  return (
    <Pagination className='w-full justify-end'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href='#' />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#'>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#' isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#'>3</PaginationLink>
        </PaginationItem>
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

export default function ProductTable({ data }: { data: Product[] }) {
  return (
    <section className='bg-white p-4 rounded-md shadow-md mt-4'>
      <Table>
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[50px]'>
              <Checkbox />
            </TableHead>
            <TableHead>产品图片</TableHead>
            <TableHead>产品信息</TableHead>
            <TableHead>分类</TableHead>
            <TableHead>价格</TableHead>
            <TableHead>库存</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className='text-right'>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <img
                  className='w-16 h-16 rounded-md'
                  src={item.photo}
                  alt={item.productName}
                />
              </TableCell>
              <TableCell>
                <article>
                  <h3 className='text-lg font-bold'>{item.productName}</h3>
                  <p className='text-sm text-gray-500'>{item.productInfo}</p>
                  <p className='text-sm text-gray-500'>{item.description}</p>
                </article>
              </TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>
                <Badge variant='secondary'>{item.status}</Badge>
              </TableCell>
              <TableCell className='text-right'>
                <Button size='sm'>编辑</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={1}>Total:{data.length}</TableCell>
            <TableCell colSpan={Object.keys(data).length + 1}>
              <ProductPagination />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
}
