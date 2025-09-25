import LoginForm from './components/LoginForm';

import { useLogin } from '#/pages/auth/hooks/useLogin';

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
  } = useLogin();

  return (
    <LoginForm
      form={form}
      loginType={loginType}
      status={loginType === 'code' ? codeStatus : passwordStatus}
      registerLink={link}
      onSubmit={handleSubmit}
      onChangeLoginType={handleChangeLoginType}
      onGetCode={handleGetCode}
    />
  );
};
