import { create } from "zustand";
import { ExtendsPageType } from "@/interface/page";

interface GameState {
  gameInitData: ExtendsPageType | null;
  setGameInitData: (data: ExtendsPageType) => void;
  clearGameInitData: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameInitData: null,
  setGameInitData: (data: ExtendsPageType) => set({ gameInitData: data }),
  clearGameInitData: () => set({ gameInitData: null }),
}));
