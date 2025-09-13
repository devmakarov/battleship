import { create } from "zustand";

type OnlineState = {
  count: number;
  setCount: (count: number) => void;
};

export const useOnlineStore = create<OnlineState>((set) => ({
  count: 1,
  setCount: (count) => set({ count }),
}));
