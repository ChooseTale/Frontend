"use server";
import type { HttpError } from "@choosetale/nestia-type";
import type { Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import api from "@/lib/axios/axios";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  count: number;
}

export const getGameListCount = async ({
  genre,
}: {
  genre: Genres;
}): Promise<ApiResponse<ApiSuccessResponse>> => {
  const url = `/game-play/list/count?genre=${genre}`;

  try {
    const response = await api.get(url);
    const data = response.data as { count: number };

    return { success: true, count: data.count };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
