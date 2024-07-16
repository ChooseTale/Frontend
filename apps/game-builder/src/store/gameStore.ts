import { create } from "zustand";
import { CreateGameResDto } from "@choosetale/nestia-type/lib/structures/CreateGameResDto";

interface GameState {
  gameInitData: CreateGameResDto | null;
  setGameInitData: (data: CreateGameResDto) => void;
  clearGameInitData: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameInitData: null,
  setGameInitData: (data: CreateGameResDto) => set({ gameInitData: data }),
  clearGameInitData: () => set({ gameInitData: null }),
}));
