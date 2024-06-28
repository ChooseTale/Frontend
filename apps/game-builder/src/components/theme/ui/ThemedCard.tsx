"use client";
import { useThemeStore } from "@/store/useTheme";
import { Card } from "@repo/ui/components/ui/Card.tsx";
import { ReactNode } from "react";
import ThemedIconButton from "./ThemedIconButton";
import { Pencil2Icon } from "@radix-ui/react-icons";

interface ThemedCardProps {
  children: ReactNode;
  className?: string;
  isChoice?: boolean;
}

export default function ThemedCard({
  children,
  className,
  isChoice,
}: ThemedCardProps) {
  const { theme } = useThemeStore((state) => state);
  let themeClass;

  switch (theme) {
    case "old-game":
      themeClass = `${isChoice ? "nes-balloon from-right" : "nes-container"} !flex !p-0`;
      break;
    case "windows-98":
      themeClass = "rounded-none bg-[#dfdfdf]";
      break;
    default:
  }

  return (
    <Card className={`flex ${themeClass} ${className}`}>
      {children}
      <ThemedIconButton className="!absolute top-1 right-1">
        <Pencil2Icon className="h-4 w-4" />
      </ThemedIconButton>
    </Card>
  );
}
