"use client";
import { useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { type FormattedSearchParams } from "@/utils/formatGameListSearchParams";
import { type GameInfo } from "@/interface/customType";
import GenresSelect from "../game/confirm/form/GenresSelect";

interface GameListSelectProps {
  searchParams: FormattedSearchParams;
}

export default function GameListGenresSelect({
  searchParams,
}: GameListSelectProps) {
  const router = useRouter();
  const params = useSearchParams();

  const defaultValues = { genre: searchParams.genre };
  const { control } = useForm<Partial<GameInfo>>({
    defaultValues,
  });
  const genre = useWatch({ control, name: "genre" });

  const handleFilterChange = useCallback(
    (newGenre: string) => {
      const updatedParams = new URLSearchParams(params);
      updatedParams.set("genre", newGenre);

      router.push(`?${updatedParams.toString()}`);
    },
    [router, params]
  );

  useEffect(() => {
    if (genre) {
      handleFilterChange(genre);
    }
  }, [genre, handleFilterChange]);

  const sortId = "genresSelect";

  return (
    <>
      <label htmlFor={sortId}>장르</label>
      <GenresSelect
        id={sortId}
        name="genre"
        labelText=""
        control={control}
        hasSelectAll
      />
    </>
  );
}
