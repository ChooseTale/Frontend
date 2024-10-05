import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { type Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import type { InputProps } from "@repo/ui/components/ui/Input.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/Select.tsx";
import { GENRES } from "@/constants/genres";
import type { GameInfo } from "@/interface/customType";
import { useTranslation } from "@/hooks/useTranslation";
import ThemedLabel from "@/components/theme/ui/ThemedLabel";

interface GenresSelectProps extends InputProps {
  labelText: string;
  name: keyof Partial<GameInfo>;
  control: Control<Partial<GameInfo>>;
  hasSelectAll?: boolean;
}

export default function GenresSelect({
  labelText,
  name,
  control,
  hasSelectAll = false,
  ...props
}: GenresSelectProps) {
  const { t } = useTranslation();
  let genres: (Genres | "ALL")[] = GENRES;

  if (hasSelectAll) {
    genres = ["ALL", ...genres];
  }

  return (
    <div className="flex flex-col gap-2">
      <ThemedLabel labelText={labelText} />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value ? String(field.value).toLocaleUpperCase() : ""}
          >
            <SelectTrigger className="!text-xs !w-full bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent id={props.id}>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {t(`genre.${genre}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
