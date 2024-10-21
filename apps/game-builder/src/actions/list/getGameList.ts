"use server";
import type { Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import type { GameList, SortType } from "@/interface/customType";
import api from "@/lib/axios/axios";

export const getGameList = ({
  page,
  limit = 6,
  genre,
  sort,
}: {
  page: number;
  limit?: number;
  genre: Genres;
  sort: SortType;
}): Promise<{ data: GameList }> => {
  return api.get("/game-play/list", {
    params: {
      page,
      limit,
      genre,
      sort,
    },
  });
};
