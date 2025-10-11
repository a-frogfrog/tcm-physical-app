import '../globals.css';
import '../styles/index.css';

import { SetupRouter } from './provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 失败重试 1 次
      refetchOnWindowFocus: false, // 切换窗口时不自动重新请求
      staleTime: 1000 * 60, // 数据过期时间
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-center' richColors />
      <SetupRouter />
    </QueryClientProvider>
  );
}
