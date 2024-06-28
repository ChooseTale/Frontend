"use client";
import { useThemeStore } from "@/store/useTheme";

export default function DotIndicator() {
  const { theme } = useThemeStore((state) => state);

  return (
    <div
      className={`absolute w-3 h-3 bg-green-500 rounded-full top-1/2 -translate-y-1/2 -left-2 -translate-x-[22px] ${theme === "old-game" ? "-translate-x-[25px]" : ""}`}
    ></div>
  );
}
