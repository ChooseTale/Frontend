import { type Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import { type SortType } from "@/interface/customType";

export interface GameListSearchParams {
  genre: string;
  sort?: SortType;
}

export type FormattedSearchParams = ReturnType<
  typeof formatGameListSearchParams
>;

export const formatGameListSearchParams = (prev: GameListSearchParams) => {
  const currentGenre = prev?.genre ?? "ALL";

  return {
    genre: currentGenre.toLocaleUpperCase() as Genres,
    sort: prev.sort || "LATEST",
  };
};
