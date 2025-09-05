import type React from 'react';
// import { Provider } from 'react-redux';

interface SetupStoreProps {
  children: React.ReactNode;
}

export default function SetupStore({ children }: SetupStoreProps) {
  // return <Provider store={store}>{children}</Provider>;
  return <div>{children}</div>;
}
