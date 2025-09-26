import { create } from 'zustand';

type LoadingStore = {
  visible: boolean;
  show: () => void;
  hide: () => void;
};

export const useLoadingStore = create<LoadingStore>((set) => ({
  visible: false,
  show: () => set({ visible: true }),
  hide: () => set({ visible: false }),
}));
