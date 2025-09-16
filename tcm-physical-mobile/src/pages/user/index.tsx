import { PageTitle } from '#/components/common';
import AccountSettings from './modules/AccountSettings';
import UserMenu from './modules/UserMenu';
import UserProfileCard from './modules/UserProfileCard';

export default function UserPage() {
  return (
    <>
      <PageTitle title='个人中心' description='管理您的账户信息和设置' />
      <UserProfileCard />
      <UserMenu />
      <AccountSettings />
    </>
  );
}
