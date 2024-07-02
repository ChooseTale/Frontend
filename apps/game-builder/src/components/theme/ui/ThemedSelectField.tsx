import { useThemeStore } from "@/store/useTheme";
import { InputProps } from "@repo/ui/components/ui/Input.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/Select.tsx";
import ThemedLabel from "./ThemedLabel";
import { GENRES } from "@/interface/page";

interface ThemedSelectFieldProps extends InputProps {
  labelText: string;
  className?: string;
}

export default function ThemedSelectField({
  labelText,
  className,
  ...props
}: ThemedSelectFieldProps) {
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

  if (theme === "old-game" || theme === "windows-98") {
    return (
      <div className="flex flex-col gap-2">
        <ThemedLabel htmlFor={props.name} labelText={labelText} />
        <div className="nes-select">
          <select required id="default_select">
            <option value="" disabled selected hidden>
              {props.value}
            </option>
            {GENRES.map((genre) => (
              <option value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <ThemedLabel htmlFor={props.name} labelText={labelText} />

      <Select>
        <SelectTrigger className="!text-xs !w-full bg-white">
          <SelectValue placeholder={props.value} />
        </SelectTrigger>
        <SelectContent>
          {GENRES.map((genre) => (
            <SelectItem key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
