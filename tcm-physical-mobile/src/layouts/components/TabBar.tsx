import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';

type Tab = {
  to: string;
  label: string;
  icon: React.ReactNode;
};

type TabBarProps = {
  tabs: Tab[];
};

const TabBar = ({ tabs }: TabBarProps) => {
  return (
    <div className='fixed -bottom-1 left-0 flex w-full justify-around border-t bg-white py-2 shadow-lg'>
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? 'text-[#2D6A4F]' : 'text-gray-500'
            }`
          }>
          {({ isActive }) => (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className='flex flex-col items-center'>
              <motion.div
                animate={{ scale: isActive ? 1.2 : 1 }}
                transition={{ type: 'spring', stiffness: 300 }}>
                {tab.icon}
              </motion.div>
              <span className='mt-1'>{tab.label}</span>
            </motion.div>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default TabBar;
