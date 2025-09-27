import LoginForm from '#/features/auth/components/LoginForm';

import { useLogin } from '#/features/auth/hooks/useLogin';

export default function LoginRoute() {
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
}
