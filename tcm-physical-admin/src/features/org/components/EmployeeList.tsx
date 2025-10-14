import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

export type Employee = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
};

export type Department = {
  id: number;
  name: string;
  employees: Employee[];
};

const statusColor = {
  online: 'bg-green-500',
  away: 'bg-orange-400',
  offline: 'bg-red-500',
};

function EmployeeList({ children }: React.ComponentProps<'div'>) {
  return (
    <motion.div
      className='flex w-full flex-col gap-4 rounded-2xl bg-white p-4 shadow-md'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      {/* 标题栏 */}
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-gray-800'>员工列表</h2>
        <div className='flex items-center gap-2 text-gray-500'>
          <Search className='h-5 w-5 cursor-pointer hover:text-gray-700' />
          <Filter className='h-5 w-5 cursor-pointer hover:text-gray-700' />
        </div>
      </div>

      {/* 员工部门列表 */}
      {children}
    </motion.div>
  );
}

function EmployeeSection({
  dept,
  children,
}: React.ComponentProps<'section'> & { dept: Department }) {
  return (
    <div className='flex flex-col divide-y divide-gray-200'>
      <div key={dept.id} className='pt-2'>
        <p className='mb-2 text-sm font-medium text-gray-500'>
          {dept.name}（{dept.employees.length}人）
        </p>

        <div className='flex flex-col gap-1'>{children}</div>
      </div>
    </div>
  );
}

function EmployeeItem({
  emp,
  className,
}: { emp: Employee } & React.ComponentProps<'div'>) {
  return (
    <motion.div
      key={emp.id}
      className={`flex cursor-pointer items-center justify-between rounded-xl p-2 transition-all ${className}`}
      whileTap={{ scale: 0.98 }}>
      <div className='flex items-center gap-3'>
        <img
          src={emp.avatar}
          alt={emp.name}
          className='h-10 w-10 rounded-full object-cover'
        />
        <div>
          <p className='font-medium text-gray-800'>{emp.name}</p>
          <p className='text-sm text-gray-500'>{emp.role}</p>
        </div>
      </div>
      <div className={`h-3 w-3 rounded-full ${statusColor[emp.status]}`} />
    </motion.div>
  );
}

export { EmployeeList, EmployeeSection, EmployeeItem };
