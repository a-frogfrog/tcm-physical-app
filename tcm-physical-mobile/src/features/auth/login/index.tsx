import LoginForm from '../components/LoginForm';

import { useLogin } from '#/features/auth/hooks/useLogin';
import { useLoadingStore } from '#/stores';

/**
 * 登录路由
 * @returns 登录交互组件
 */
export default function LoginPage() {
  return <LoginInteraction />;
}

const LoginInteraction = () => {
  const {
    form,
    link,
    passwordStatus,
    codeStatus,
    loginType,
    handleChangeLoginType,
    handleSubmit,
    handleGetCode,
    isPending,
  } = useLogin();

  const { show } = useLoadingStore();
  setTimeout(() => {
    show();
  }, 2000);

  return (
    <LoginForm
      form={form}
      loginType={loginType}
      status={loginType === 'code' ? codeStatus : passwordStatus}
      registerLink={link}
      onSubmit={handleSubmit}
      onChangeLoginType={handleChangeLoginType}
      onGetCode={handleGetCode}
      isPending={isPending}
    />
  );
};
