"use client";
import { type FormattedSearchParams } from "@/utils/formatGameListSearchParams";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import GameListSort from "./GameListSort";
import GenresFilterDraw from "./GenresFilterDraw";

interface FilterComponentProps {
  searchParams: FormattedSearchParams;
}

export default function GameListFilters({
  searchParams,
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
      <GameListSort
        searchParams={searchParams}
        handleSortChange={handleSortChange}
      />
    </>
  );
}
