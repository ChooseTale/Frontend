"use server";
import { revalidateTag } from "next/cache";
import type { HttpError } from "@choosetale/nestia-type";
import { API_URL } from "@/config/config";
import type { GamePlay } from "@/interface/customType";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  gamePlay: GamePlay;
}

export const postGameFirstStart = async (
  gameId: number
): Promise<ApiResponse<ApiSuccessResponse>> => {
  try {
    const response = await fetch(
      `${API_URL}/game-play/intro/${gameId}/first-start`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const gamePlay = (await response.json()) as GamePlay;

    revalidateTag("game-intro");
    return { success: true, gamePlay };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
