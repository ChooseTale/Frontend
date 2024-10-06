"use server";
import type { HttpError } from "@choosetale/nestia-type";
import type { Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import { API_URL } from "@/config/config";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  count: number;
}

export const getGameListCount = async ({
  genre,
}: {
  genre: Genres;
}): Promise<ApiResponse<ApiSuccessResponse>> => {
  const url = `${API_URL}/game-play/list/count?genre=${genre}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    });

    const data = (await response.json()) as { count: number };

    return { success: true, count: data.count };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
