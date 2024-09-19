import { forwardRef } from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { InputProps } from "@repo/ui/components/ui/Input.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/Select.tsx";
import type { GameInfo } from "@/interface/customType";
import { GENRES } from "@/constants/genres";
import ThemedLabel from "@/components/theme/ui/ThemedLabel";
import { useTranslation } from "@/hooks/useTranslation";

interface GenresSelectProps extends InputProps {
  labelText: string;
  name: keyof GameInfo;
  control: Control<GameInfo>;
}

const GenresSelect = forwardRef<HTMLSelectElement, GenresSelectProps>(
  ({ labelText, name, control, ...props }) => {
    const { t } = useTranslation();

    return (
      <div className="flex flex-col gap-2">
        <ThemedLabel labelText={labelText} />
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value ? String(field.value) : ""}
            >
              <SelectTrigger className="!text-xs !w-full bg-white">
                <SelectValue placeholder={props.value} />
              </SelectTrigger>
              <SelectContent>
                {GENRES.map((genre) => (
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
);

GenresSelect.displayName = "GenresSelect";

export default GenresSelect;
