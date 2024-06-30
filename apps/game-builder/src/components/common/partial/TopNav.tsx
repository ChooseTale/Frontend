"use client";
import BackButton from "@/components/button/BackButton";
import ThemeSelector from "@/components/theme/ThemeSelector";
import { useThemeStore } from "@/store/useTheme";

export default function TopNav({ title }: { title: string }) {
  const { theme } = useThemeStore((state) => state);

  return (
    <div
      className={`w-full h-12 px-6 flex justify-between items-center sticky top-0 bg-[rgba(255,255,255,0.75)] backdrop-blur-lg transition-all z-[15] ${theme === "windows-98" ? "!bg-[rgba(175,175,175,0.75)] backdrop-blur-md" : ""}`}
    >
      <BackButton />
      <h4 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {title}
      </h4>
      <ThemeSelector />
    </div>
  );
}
