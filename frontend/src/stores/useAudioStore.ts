import { create } from "zustand";

type AudioState = {
  isMuted: boolean;
  toggleIsMuted: () => void;
};

export const useAudioStore = create<AudioState>((set) => ({
  isMuted: false,
  toggleIsMuted: () => set((state) => ({ isMuted: !state.isMuted })),
}));
