import { useApplication } from '#/hooks';
import { GalleryVerticalEnd } from 'lucide-react';
import { sidebarMenu } from '#/constants';
import { useAuthStore } from '#/stores';

export const useFetchSidebarData = () => {
  const { name } = useApplication();

  const userInfo = useAuthStore((s) => s.user);

  const user = {
    name: userInfo?.name || '老中医·黄',
    email: userInfo?.email || 'tcm@example.com',
    avatar: '/avatars/frog.jpg',
  };

  const logoItem = {
    name,
    logo: GalleryVerticalEnd,
    plan: 'Enterprise',
  };

  return {
    name,
    sidebarMenu,
    user,
    logoItem,
  };
};
