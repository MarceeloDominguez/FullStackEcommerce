import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const cookieStorage = {
  getItem: (name: string): string | null => {
    const value = getCookie(name) as string | undefined;
    return value || null;
  },
  setItem: (name: string, value: string): void => {
    setCookie(name, value);
  },
  removeItem: (name: string): void => {
    deleteCookie(name);
  },
};

interface User {
  address: string;
  email: string;
  id: number;
  name: string;
  password: string;
  role: string;
}

type State = {
  user: null | User;
  token: null | string;
};

type Actions = {
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
};

export const useAuth = create(
  persist<State & Actions>(
    (set) => ({
      user: null,
      token: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => {
        set({ user: null, token: null });
        cookieStorage.removeItem("auth-token");
      },
    }),
    {
      name: "auth-token",
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);
