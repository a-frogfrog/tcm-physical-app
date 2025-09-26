import { createContext, useContext, useState } from 'react';

type LoadingContextType = {
  show: () => void;
  hide: () => void;
  visible: boolean;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <LoadingContext.Provider value={{ visible, show, hide }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error('useLoading must be used within LoadingProvider');
  return ctx;
};
