"use server";
import type { Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import type { GameList, SortType } from "@/interface/customType";
import api from "@/lib/axios/axios";

export const getGameList = async ({
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
  const url = `/game-play/list?page=${page}&limit=${limit}&genre=${genre}&sort=${sort}`;
  return api.get(url);
};
