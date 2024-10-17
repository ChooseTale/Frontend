"use client";
import { type FormattedSearchParams } from "@/utils/formatGameListSearchParams";
import type { GameListOption } from "@/interface/customType";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import GameListSort from "./GameListSort";
import GenresFilterDraw from "./GenresFilterDraw";

interface FilterComponentProps {
  searchParams: FormattedSearchParams;
  option: GameListOption;
}

export default function GameListFilters({
  searchParams,
  option,
}: FilterComponentProps) {
  const { updateSearchParams } = useUpdateSearchParams();

  const handleGenreChange = (newGenre: string) => {
    updateSearchParams("genre", newGenre);
  };

  const handleSortChange = (newSort: string) => {
    updateSearchParams("sort", newSort);
  };

  return (
    <>
      <GenresFilterDraw
        searchParams={searchParams}
        handleGenreChange={handleGenreChange}
      />
      {option && (
        <GameListSort
          searchParams={searchParams}
          handleSortChange={handleSortChange}
          option={option}
        />
      )}
    </>
  );
}
