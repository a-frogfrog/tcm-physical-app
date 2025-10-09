import { Input, Button, Label, Textarea } from '#/components/ui';
import { Edit, Trash2 } from 'lucide-react';
import type { DetailsProps } from './constants';

const DetailsPanel = ({ node, onEdit, onDelete, onAdd }: DetailsProps) => {
  if (!node) return <div className='p-6'>请选择节点</div>;

  return (
    <div className='p-6'>
      <div className='flex items-start justify-between'>
        <div>
          <h3 className='text-xl font-semibold'>{node.name}</h3>
          <div className='mt-2 text-sm text-slate-600'>
            <div>类型：{node.role}</div>
            {node.meta?.address && <div>地址：{node.meta?.address}</div>}
            {node.meta?.title && <div>职称：{node.meta?.title}</div>}
            <div>子节点：{node.children?.length ?? 0}</div>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Button variant='outline' onClick={() => onEdit(node)}>
            编辑
          </Button>
          <Button variant='ghost' onClick={() => onDelete(node.id)}>
            删除
          </Button>
        </div>
      </div>

      <div className='mt-6 grid grid-cols-2 gap-4'>
        <div>
          <Label>节点名称</Label>
          <Input value={node.name} readOnly />
        </div>
        <div>
          <Label>节点类型</Label>
          <Input value={node.role} readOnly />
        </div>
        <div className='col-span-2'>
          <Label>描述 / 备注</Label>
          <Textarea value={node.meta?.desc || ''} readOnly />
        </div>
      </div>

      {node.children && node.role === 'dept' && (
        <div className='mt-6'>
          <div className='flex items-center justify-between'>
            <h4 className='font-medium'>理疗师列表</h4>
            <Button size='sm' onClick={() => onAdd(node.id, 'staff')}>
              新增理疗师
            </Button>
          </div>
          <div className='mt-3 grid grid-cols-2 gap-2'>
            {node.children.map((s) => (
              <div key={s.id} className='rounded-lg border p-3'>
                <div className='flex items-center justify-between'>
                  <div>
                    <div className='font-medium'>{s.name}</div>
                    <div className='text-sm text-slate-500'>
                      {s.meta?.title || '理疗师'}
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Button
                      size='icon'
                      variant='ghost'
                      onClick={() => onEdit(s)}>
                      <Edit className='h-4 w-4' />
                    </Button>
                    <Button
                      size='icon'
                      variant='ghost'
                      onClick={() => onDelete(s.id)}>
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPanel;
