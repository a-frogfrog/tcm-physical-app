import { create } from 'zustand';

type LayoutStoreType = {
  /**
   * @description header 是否显示阴影
   */
  headerShadow: boolean;
  /**
   *
   * @param value 是否显示状态
   * @returns void
   */
  setHeaderShadow: (value: boolean) => void;
};

/**
 * @description 管理布局相关状态.
 */
export const useLayoutStore = create<LayoutStoreType>((set) => ({
  headerShadow: false,
  setHeaderShadow: (value) => set(() => ({ headerShadow: value })),
}));
