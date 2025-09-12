import { useApplication } from '#/hooks';
import { GalleryVerticalEnd } from 'lucide-react';
import { sidebarMenu } from '#/constants';

export const useFetchSidebarData = () => {
  const { name } = useApplication();
  const user = {
    name: '老中医·黄',
    email: 'tcm@example.com',
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
