import { create } from 'zustand';

export const FORM_THERAPY_TABS = {
  basic: 'basic',
  pricing: 'pricing',
  details: 'details',
  settings: 'settings',
};

export type FormTherapyTabs = typeof FORM_THERAPY_TABS;

export type FormTherapyTab = keyof FormTherapyTabs;

type FromTherapyStoreType = {
  activeTab: FormTherapyTab;
  isSuccess: boolean;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setActiveTab: (tab: FormTherapyTab) => void;
  setIsSuccess: (isSuccess: boolean) => void;
};

export const useFormTherapyStore = create<FromTherapyStoreType>((set) => ({
  activeTab: 'basic',
  isSuccess: false,
  isSubmitting: false,
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setIsSuccess: (isSuccess) => set({ isSuccess }),
}));
