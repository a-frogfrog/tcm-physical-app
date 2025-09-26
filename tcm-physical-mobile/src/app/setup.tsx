import { RouterProvider } from 'react-router-dom';
import router from './router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from 'sonner';
import { useToastStore } from '#/stores';

import { LoaderPortal, Mask } from '#/components/common';
import { LoadingProvider, useLoading } from './LoadingContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 失败重试 1 次
      refetchOnWindowFocus: false, // 切换窗口时不自动重新请求
      staleTime: 1000 * 60, // 数据过期时间
    },
  },
});

export default function SetupApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position={useToastStore((state) => state.sonnerPosition)}
        richColors
      />
      <LoadingProvider>
        <SetupLoader />
        <RouterProvider router={router} />;
      </LoadingProvider>
    </QueryClientProvider>
  );
}

const SetupLoader = () => {
  const { visible } = useLoading();

  return (
    visible && (
      <Mask backdrop>
        <LoaderPortal />
      </Mask>
    )
  );
};
