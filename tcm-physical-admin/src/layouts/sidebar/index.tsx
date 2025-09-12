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

import { useFetchSidebarData } from './constants';
import React from 'react';

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { logoItem, sidebarMenu, user } = useFetchSidebarData();

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <NavLogo item={logoItem} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarMenu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />{' '}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

interface AppSidebarErrorState {
  hasError: boolean;
  error?: Error;
}

export class AppSidebarError extends React.Component<
  { children?: React.ReactNode },
  AppSidebarErrorState
> {
  constructor(props: { children?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  // componentDidCatch(error: any, errorInfo: any) {
  //   // 记录错误信息，可发送到日志服务
  //   console.log('Error caught:', error, errorInfo);
  // }

  render() {
    if (this.state.hasError) {
      // 显示回退 UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
