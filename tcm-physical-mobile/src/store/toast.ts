import { create } from 'zustand';

type SonnerPosition =
  | 'top-center'
  | 'top-right'
  | 'top-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'bottom-left';

type ToastStore = {
  sonnerPosition: SonnerPosition;
};

export const useToastStore = create<ToastStore>((set) => ({
  sonnerPosition: 'top-center',
  setSonnerPosition: (position: SonnerPosition) =>
    set({ sonnerPosition: position }),
}));
