import { type Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import { type SortType } from "@/interface/customType";

export interface GameListSearchParams {
  page: string;
  genre: string;
  sort?: SortType;
}

export type FormattedSearchParams = ReturnType<
  typeof formatGameListSearchParams
>;

export const formatGameListSearchParams = (
  searchParams: GameListSearchParams
) => {
  const defaultLimit = 10;
  const currentGenre = searchParams?.genre ?? "ALL";

  return {
    page: Number(searchParams.page) || 1,
    limit: defaultLimit,
    genre: currentGenre.toLocaleUpperCase() as Genres,
    sort: searchParams.sort || "LATEST",
  };
};
