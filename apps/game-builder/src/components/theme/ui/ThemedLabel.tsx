import { useThemeStore } from "@/store/useTheme";
import { Label } from "@repo/ui/components/ui/Label.tsx";

interface ThemedInputFieldProps {
  labelText: string;
  htmlFor?: string;
}

export default function ThemedLabel({
  labelText,
  htmlFor,
}: ThemedInputFieldProps) {
  const { theme } = useThemeStore((state) => state);
  let themeClass;

  switch (theme) {
    case "old-game":
      themeClass = "text-lg font-black";
      break;
    case "windows-98":
      themeClass = "font-bold";
      break;
    default:
  }

  return (
    <Label htmlFor={htmlFor} className={`${themeClass} mb-0`}>
      {labelText}
    </Label>
  );
}
