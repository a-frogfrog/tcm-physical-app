import { Separator } from '#/components/ui/separator';
import { SidebarTrigger } from '#/components/ui/sidebar';
import { Switch } from '#/components/ui/switch';
import { LIKE } from '#/constants';
import { Bell, Github, Maximize } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '#/components/ui/breadcrumb';

export default function AppHeader() {
  return (
    <div className='group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear'>
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

      <Tooltip>
        <TooltipTrigger>
          <Bell
            aria-label='Notifications'
            strokeWidth={1.75}
            className='cursor-pointer'
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>通知</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Maximize
            aria-label='Expand'
            strokeWidth={1.75}
            className='cursor-pointer'
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>最大化</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <a href={LIKE.github} target='_blank'>
            <Github
              aria-label='GitHub'
              strokeWidth={1.75}
              className='cursor-pointer'
            />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>GitHub 仓库</p>
        </TooltipContent>
      </Tooltip>
    </nav>
  );
};
