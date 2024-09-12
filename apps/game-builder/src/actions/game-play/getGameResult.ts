"use server";
import type { HttpError } from "@choosetale/nestia-type";
import { API_URL } from "@/config/config";
import type { GameResult } from "@/interface/customType";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  result: GameResult;
}

export const getGameResult = async (
  playId: number
): Promise<ApiResponse<ApiSuccessResponse>> => {
  try {
    const response = await fetch(`${API_URL}/game-play/result/${playId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    });

    const result = (await response.json()) as GameResult;
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
