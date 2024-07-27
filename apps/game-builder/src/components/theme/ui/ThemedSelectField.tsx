import type { InputProps } from "@repo/ui/components/ui/Input.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/Select.tsx";
import { useThemeStore } from "@/store/useTheme";
import { GENRES } from "@/interface/newGameData";
import ThemedLabel from "./ThemedLabel";

interface ThemedSelectFieldProps extends InputProps {
  labelText: string;
}

export default function ThemedSelectField({
  labelText,
  ...props
}: ThemedSelectFieldProps) {
  const { theme } = useThemeStore((state) => state);

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
              <option value={genre} key={genre}>
                {genre}
              </option>
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
