import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '#/components/ui/breadcrumb';
import { Separator } from '#/components/ui/separator';
import { SidebarTrigger } from '#/components/ui/sidebar';
import { Switch } from '#/components/ui/switch';
import { Bell, Github, Maximize } from 'lucide-react';

const BreadcrumbUI = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className='hidden md:block'>
          <BreadcrumbLink href='#'>仪表板</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className='hidden md:block' />
        <BreadcrumbItem>
          <BreadcrumbPage>工作台</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const TopActionBar = () => {
  return (
    <nav className='flex items-center gap-4'>
      <Switch />
      <button>
        <Bell
          aria-label='Notifications'
          strokeWidth={1.75}
          className='cursor-pointer'
        />
      </button>
      <button>
        <Maximize
          aria-label='Expand'
          strokeWidth={1.75}
          className='cursor-pointer'
        />
      </button>
      <button>
        <Github
          aria-label='GitHub'
          strokeWidth={1.75}
          className='cursor-pointer'
        />
      </button>
    </nav>
  );
};

export default function AppHeader() {
  return (
    <div className='flex px-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <nav className='flex flex-1 items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mr-2 data-[orientation=vertical]:h-4'
        />
        <BreadcrumbUI />
      </nav>
      <TopActionBar />
    </div>
  );
}
