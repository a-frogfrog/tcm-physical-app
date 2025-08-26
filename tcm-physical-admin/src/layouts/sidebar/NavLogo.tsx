import { ChevronsUpDown } from 'lucide-react';

interface NavLogoProps {
  item: {
    name: string;
    logo: React.ElementType;
    plan: string;
  };
}

export function NavLogo({ item }: NavLogoProps) {
  if (!item) {
    return null;
  }

  return (
    <div className='flex gap-2 items-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
      <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
        <item.logo className='size-4' />
      </div>
      <div className='grid flex-1 text-left text-sm leading-tight'>
        <span className='truncate font-medium text-lg font-ali-mama'>
          {item.name}
        </span>
        <span className='truncate text-xs'>{item.plan}</span>
      </div>
      <ChevronsUpDown className='ml-auto' />
    </div>
  );
}
