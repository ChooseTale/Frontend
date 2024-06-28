import { useThemeStore } from "@/store/useTheme";
import { Input, InputProps } from "@repo/ui/components/ui/input.tsx";
import ThemedLabel from "./ThemedLabel";

interface ThemedInputFieldProps extends InputProps {
  labelText: string;
  className?: string;
}

export default function ThemedInputField({
  labelText,
  className,
  ...props
}: ThemedInputFieldProps) {
  const { theme } = useThemeStore((state) => state);
  let themeClass;

  switch (theme) {
    case "old-game":
      themeClass = "nes-input";
      break;
    case "windows-98":
      themeClass = "rounded-none";
      break;
    default:
  }

  return (
    <div className="flex flex-col gap-2">
      <ThemedLabel htmlFor={props.name} labelText={labelText} />
      <Input {...props} className={`${className} ${themeClass} bg-white`} />
    </div>
  );
}
