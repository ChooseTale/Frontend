"use server";
import type { HttpError } from "@choosetale/nestia-type";
import type { Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import { API_URL } from "@/config/config";
import type { GameList, SortType } from "@/interface/customType";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  gameList: GameList;
}

export const getGameList = async ({
  page,
  limit,
  genre,
  sort,
}: {
  page: number;
  limit: number;
  genre: Genres;
  sort: SortType;
}): Promise<ApiResponse<ApiSuccessResponse>> => {
  const url = `${API_URL}/game-play/list?page=${page}&limit=${limit}&genre=${genre}&sort=${sort}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    });

    const data = (await response.json()) as GameList;
    return { success: true, gameList: data };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
