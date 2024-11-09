import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
};

export const useAuth = create(
  persist<State & Actions>(
    (set) => ({
      user: null,
      token: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
