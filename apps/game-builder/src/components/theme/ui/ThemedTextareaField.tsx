import { useThemeStore } from "@/store/useTheme";
import { Textarea, TextareaProps } from "@repo/ui/components/ui/Textarea.tsx";
import ThemedLabel from "./ThemedLabel";

interface ThemedTextareaFieldProps extends TextareaProps {
  labelText: string;
  className?: string;
}

export default function ThemedTextareaField({
  labelText,
  className,
  ...props
}: ThemedTextareaFieldProps) {
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
      <Textarea {...props} className={`${className} ${themeClass} bg-white`} />
    </div>
  );
}
