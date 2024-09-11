"use server";
import type { HttpError } from "@choosetale/nestia-type";
import { API_URL } from "@/config/config";
import type { GameIntro } from "@/interface/customType";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  intro: GameIntro;
}

export const getGameIntro = async (
  gameId: number
): Promise<ApiResponse<ApiSuccessResponse>> => {
  try {
    const response = await fetch(`${API_URL}/game-play/intro/${gameId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      next: { tags: ["game-intro"] },
    });

    const intro = (await response.json()) as GameIntro;
    return { success: true, intro };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
