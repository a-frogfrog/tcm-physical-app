import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type User = {
  userName: string;
  email: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth_store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
