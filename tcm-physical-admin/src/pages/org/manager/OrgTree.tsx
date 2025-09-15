import { Button, Badge } from '#/components/ui';
import { ChevronDown, ChevronRight, Edit, Plus, Trash2 } from 'lucide-react';
import type { OrgNode, OrgTreeProps } from './constants';

const OrgTree = ({
  tree,
  expanded,
  selectedId,
  query,
  onToggle,
  onSelect,
  onAdd,
  onEdit,
  onDelete,
}: OrgTreeProps) => {
  const matchesQuery = (n: OrgNode): boolean =>
    n.name.includes(query) || (n.children || []).some((c) => matchesQuery(c));

  const renderNode = (node: OrgNode, level = 0) => {
    if (query && !matchesQuery(node)) return null;
    const isExpanded = !!expanded[node.id];
    const hasChildren = !!(node.children && node.children.length > 0);
    const isSelected = selectedId === node.id;

    return (
      <div key={node.id} className='mb-1'>
        <div
          className={`flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-slate-50 ${isSelected ? 'bg-slate-100' : ''}`}
          style={{ paddingLeft: `${level * 12 + 8}px` }}>
          <div
            className='flex items-center space-x-2'
            onClick={() => {
              onSelect(node.id);
              if (hasChildren) onToggle(node.id);
            }}>
            <div className='flex h-5 w-5 items-center justify-center text-slate-500'>
              {hasChildren ? (
                isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )
              ) : (
                <span className='text-xs'>•</span>
              )}
            </div>
            <div className='flex items-center space-x-2'>
              <span className='font-medium'>{node.name}</span>
              <Badge className='text-xs capitalize'>{node.role}</Badge>
            </div>
          </div>

          <div className='flex items-center space-x-1'>
            <Button
              size='icon'
              variant='ghost'
              onClick={() =>
                onAdd(
                  node.id,
                  node.role === 'staff'
                    ? 'staff'
                    : node.role === 'dept'
                      ? 'staff'
                      : 'dept',
                )
              }
              title='新增子节点'>
              <Plus className='h-4 w-4' />
            </Button>
            <Button
              size='icon'
              variant='ghost'
              onClick={() => onEdit(node)}
              title='编辑'>
              <Edit className='h-4 w-4' />
            </Button>
            <Button
              size='icon'
              variant='ghost'
              onClick={() => onDelete(node.id)}
              title='删除'>
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className='mt-1'>
            {node.children!.map((c) => renderNode(c, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return <div>{renderNode(tree)}</div>;
};

export default OrgTree;
