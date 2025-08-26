import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '#/components/ui/sidebar';
import { NavUser } from './NavUser';
import { NavMain } from './NavMain';
import { NavLogo } from './NavLogo';

import { useFetchSidebarData } from './useSidebar';

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { logoItem, navMain, user } = useFetchSidebarData();

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <NavLogo item={logoItem} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />{' '}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
