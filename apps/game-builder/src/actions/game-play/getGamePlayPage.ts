"use server";
import type { HttpError } from "@choosetale/nestia-type";
import { API_URL } from "@/config/config";
import type { GamePlayPage } from "@/interface/customType";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  gamePlayPage: GamePlayPage;
}

export const getGamePlayPage = async (
  gameId: number,
  pageId: number
): Promise<ApiResponse<ApiSuccessResponse>> => {
  try {
    const response = await fetch(
      `${API_URL}/game-play/play/${gameId}/page/${pageId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      }
    );

    const gamePlayPage = (await response.json()) as GamePlayPage;
    return { success: true, gamePlayPage };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
