import { RouterProvider } from 'react-router-dom';
import router from './router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from 'sonner';
import { useLoadingStore, useToastStore } from '#/store';

import { LoaderPortal, Mask } from '#/components/common';

import { AnimatePresence, motion } from 'motion/react';

import { ErrorBoundary } from '#/components/error/ErrorBoundary';

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
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position={useToastStore((state) => state.sonnerPosition)}
          richColors
        />
        <SetupLoader />
        {/* <ScrollLinked /> */}

        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

const SetupLoader = () => {
  const visible = useLoadingStore((state) => state.visible);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}>
          <Mask>
            <LoaderPortal />
          </Mask>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
