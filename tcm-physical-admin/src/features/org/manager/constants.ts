export type Role = 'org' | 'branch' | 'dept' | 'staff';

export interface OrgNode {
  id: string;
  name: string;
  role: Role;
  children?: OrgNode[];
  meta?: Record<string, string>;
}

export interface DetailsProps {
  node: OrgNode | null;
  onEdit: (node: OrgNode) => void;
  onDelete: (id: string) => void;
  onAdd: (parentId?: string, role?: Role) => void;
}

export interface OrgTreeProps {
  tree: OrgNode;
  expanded: Record<string, boolean>;
  selectedId: string | null;
  query: string;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  onAdd: (parentId?: string, role?: Role) => void;
  onEdit: (node: OrgNode) => void;
  onDelete: (id: string) => void;
}

export interface StatsCardProps {
  companyName: string;
  location: string;
  total: number;
  active: number;
  managers: number;
  newThisMonth: number;
}

// 模拟数据
export const mockData: OrgNode = {
  id: 'root-001',
  name: '御合堂中医馆',
  role: 'org',
  meta: { desc: '总部' },
  children: [
    {
      id: 'branch-001',
      name: '北京分院',
      role: 'branch',
      meta: { address: '北京市朝阳区' },
      children: [
        {
          id: 'dept-001',
          name: '推拿科',
          role: 'dept',
          children: [
            {
              id: 'staff-001',
              name: '王丽娜',
              role: 'staff',
              meta: { title: '主任理疗师' },
            },
            {
              id: 'staff-002',
              name: '李明远',
              role: 'staff',
              meta: { title: '理疗师' },
            },
          ],
        },
        {
          id: 'dept-002',
          name: '针灸科',
          role: 'dept',
          children: [
            {
              id: 'staff-003',
              name: '张美玲',
              role: 'staff',
              meta: { title: '资深针灸师' },
            },
          ],
        },
      ],
    },
    {
      id: 'branch-002',
      name: '上海分院',
      role: 'branch',
      meta: { address: '上海市浦东新区' },
      children: [
        {
          id: 'dept-003',
          name: '艾灸科',
          role: 'dept',
          children: [
            {
              id: 'staff-004',
              name: '赵建国',
              role: 'staff',
              meta: { title: '艾灸专家' },
            },
          ],
        },
      ],
    },
  ],
};
