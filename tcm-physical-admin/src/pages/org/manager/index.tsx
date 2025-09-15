import { useState } from 'react';
import {
  Card,
  CardContent,
  Input,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Label,
  Textarea,
} from '#/components/ui';

import { Plus, Search } from 'lucide-react';
import OrgTree from './OrgTree';
import DetailsPanel from './DetailsPanel';
import { mockData, type OrgNode, type Role } from './constants';
import StatsCard from './StatsCard';
import { PageTitle } from '#/components/common';

// Utility: generate id
const genId = (prefix = 'id') =>
  `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

// ---------------- 展示组件 ----------------

// ---------------- 容器组件 ----------------

const OrgStructureManager = ({ initialData }: { initialData: OrgNode }) => {
  const [tree, setTree] = useState<OrgNode>(initialData);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selectedId, setSelectedId] = useState<string | null>(tree.id);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  const [form, setForm] = useState<{
    id?: string;
    parentId?: string;
    name: string;
    role: Role;
    meta?: Record<string, string>;
  }>({ name: '', role: 'dept' });

  const findNodeById = (node: OrgNode, id: string): OrgNode | null => {
    if (node.id === id) return node;
    if (!node.children) return null;
    for (const c of node.children) {
      const found = findNodeById(c, id);
      if (found) return found;
    }
    return null;
  };

  const removeNodeById = (node: OrgNode, id: string): OrgNode | null => {
    if (!node.children) return node;
    node.children = node
      .children!.filter((c) => c.id !== id)
      .map((c) => removeNodeById(c, id) as OrgNode);
    return node;
  };

  const insertNodeAt = (
    node: OrgNode,
    parentId: string,
    newNode: OrgNode,
  ): OrgNode => {
    if (node.id === parentId) {
      node.children = node.children
        ? [...(node.children || []), newNode]
        : [newNode];
      return node;
    }
    if (!node.children) return node;
    node.children = node.children.map((c) =>
      insertNodeAt(c, parentId, newNode),
    );
    return node;
  };

  const toggle = (id: string) => setExpanded((s) => ({ ...s, [id]: !s[id] }));
  const handleSelect = (id: string) => setSelectedId(id);
  const handleSearch = (text: string) => setQuery(text);

  const onAdd = (parentId?: string, role?: Role) => {
    setMode('add');
    setForm({
      parentId: parentId || tree.id,
      name: '',
      role: role || 'dept',
      meta: {},
    });
    setOpen(true);
  };

  const onEdit = (node: OrgNode) => {
    setMode('edit');
    setForm({
      id: node.id,
      parentId: undefined,
      name: node.name,
      role: node.role,
      meta: node.meta || {},
    });
    setOpen(true);
  };

  const onDelete = (id: string) => {
    if (!confirm('确认删除该节点及其子节点？')) return;
    const newTree = JSON.parse(JSON.stringify(tree)) as OrgNode;
    removeNodeById(newTree, id);
    setTree(newTree);
    if (selectedId === id) setSelectedId(newTree.id);
  };

  const submit = () => {
    const newTree = JSON.parse(JSON.stringify(tree)) as OrgNode;
    if (mode === 'add') {
      const newNode: OrgNode = {
        id: genId('node'),
        name: form.name || '新节点',
        role: form.role,
        meta: form.meta || {},
      };
      insertNodeAt(newTree, form.parentId || newTree.id, newNode);
    } else if (mode === 'edit' && form.id) {
      const target = findNodeById(newTree, form.id);
      if (target) {
        target.name = form.name;
        target.role = form.role;
        target.meta = form.meta;
      }
    }
    setTree(newTree);
    setOpen(false);
  };

  const selectedNode = selectedId ? findNodeById(tree, selectedId) : null;

  return (
    <div className='flex gap-6 p-6'>
      {/* 左侧树 */}
      <div className='w-1/3'>
        <Card className='rounded-2xl shadow-sm'>
          <CardContent className='p-4'>
            <div className='mb-4 flex items-center justify-between'>
              <div className='flex w-full items-center rounded-md bg-slate-50 px-2 py-1'>
                <Search className='mr-2' />
                <Input
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder='搜索机构或人员'
                  className='border-0 bg-transparent'
                />
              </div>
              <Button className='ml-3' onClick={() => onAdd(tree.id, 'branch')}>
                <Plus className='mr-2' /> 新增分院
              </Button>
            </div>

            <div className='h-[60vh] overflow-auto'>
              <OrgTree
                tree={tree}
                expanded={expanded}
                selectedId={selectedId}
                query={query}
                onToggle={toggle}
                onSelect={handleSelect}
                onAdd={onAdd}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 右侧详情 */}
      <div className='flex-1'>
        <StatsCard
          companyName={mockData.name}
          location={mockData.meta?.desc || ''}
          total={mockData.children?.length || 0}
          active={
            mockData.children?.filter((c) => c.role === 'staff').length || 0
          }
          managers={
            mockData.children?.filter((c) => c.role === 'dept').length || 0
          }
          newThisMonth={
            mockData.children?.filter((c) => c.role === 'staff').length || 0
          }
        />
        <Card className='my-6 rounded-2xl shadow-sm'>
          <CardContent>
            <DetailsPanel
              node={selectedNode}
              onEdit={onEdit}
              onDelete={onDelete}
              onAdd={onAdd}
            />
          </CardContent>
        </Card>
      </div>

      {/* 弹窗 */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === 'add' ? '新增节点' : '编辑节点'}
            </DialogTitle>
          </DialogHeader>

          <div className='mt-2 space-y-4'>
            <div>
              <Label>名称</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>类型</Label>
              <select
                value={form.role}
                onChange={(e) =>
                  setForm((f) => ({ ...f, role: e.target.value as Role }))
                }
                className='w-full rounded-md border p-2'>
                <option value='branch'>分院</option>
                <option value='dept'>科室</option>
                <option value='staff'>理疗师</option>
              </select>
            </div>
            <div>
              <Label>描述 / 地址 / 职称</Label>
              <Textarea
                value={
                  form.meta?.desc ||
                  form.meta?.address ||
                  form.meta?.title ||
                  ''
                }
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    meta: { ...(f.meta || {}), desc: e.target.value },
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant='outline' onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button onClick={submit}>{mode === 'add' ? '创建' : '保存'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const OrgStructureManagerPage = () => {
  return (
    <>
      <PageTitle
        title='组织架构管理'
        desc='查看和管理企业部门结构、人员配置及岗位信息'
      />
      <OrgStructureManager initialData={mockData} />
    </>
  );
};

export default OrgStructureManagerPage;
