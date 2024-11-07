import { Product } from "@/type/product";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CartItem = {
  product: Product;
  quantity: number;
};

type State = {
  items: CartItem[];
  getTotalPrice: () => number;
};

type Actions = {
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  resetCart: () => void;
};

export const useCart = create(
  persist<State & Actions>(
    (set, getState) => ({
      items: [],

      addProduct: (product: Product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            const updatedItems = state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );

            return { items: updatedItems };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),

      removeProduct: (productId: number) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === productId
          );

          if (existingItem) {
            if (existingItem.quantity > 1) {
              const updatedItems = state.items.map((item) =>
                item.product.id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              );

              return { items: updatedItems };
            } else {
              const updatedItems = state.items.filter(
                (item) => item.product.id !== productId
              );
              return { items: updatedItems };
            }
          }

          return state;
        });
      },

      getTotalPrice: () =>
        getState().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),

      resetCart: () => set({ items: [] }),
    }),
    { name: "products", storage: createJSONStorage(() => AsyncStorage) }
  )
);
