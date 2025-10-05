import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('❌ React component error:', error, info);
    // 可以在这里调用上报服务，例如 Sentry.captureException(error)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className='p-6 text-center text-red-600'>
          <h2 className='text-xl font-bold'>出错了 😢</h2>
          <p className='mt-2'>{this.state.error?.message}</p>
          <button
            className='mt-4 rounded bg-blue-600 px-3 py-2 text-white'
            onClick={() => this.setState({ hasError: false })}>
            重试
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
