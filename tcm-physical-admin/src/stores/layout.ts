import { create } from 'zustand';

type LayoutStoreType = {
  headerShadow: boolean;
  setHeaderShadow: (value: boolean) => void;
};

export const useLayoutStore = create<LayoutStoreType>((set) => ({
  headerShadow: false,
  setHeaderShadow: (value) => set(() => ({ headerShadow: value })),
}));
