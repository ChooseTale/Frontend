import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemeType = "default" | "windows-98" | "old-game";

interface ThemeState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const isThemeType = (value: any): value is ThemeType => {
  return ["windows-98", "old-game", "default"].includes(value);
};

export type themePrefix = "" | "nes-";

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "default",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "cssThemeStore",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
