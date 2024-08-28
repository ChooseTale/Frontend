"use server";
import type { HttpError } from "@choosetale/nestia-type";
import type { GetAllGameResDto as GetGameAllResDto } from "@choosetale/nestia-type/lib/structures/GetAllGameResDto";
import { API_URL } from "@/config/config";
import type { ApiErrorResponse, GameInfo } from "@/interface/customType";
import type { ApiResponse, SuccessResponse } from "../action";

// --게임 정보 불러오기--
interface GetGameDataSuccessResponse extends SuccessResponse {
  gameInfo: GameInfo;
}

export const getGameInfoById = async (
  gameId: number
): Promise<ApiResponse<GetGameDataSuccessResponse>> => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}/data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      next: { tags: ["game", "game-info"] },
    });

    const gameInfo = (await response.json()) as GameInfo;
    return { success: true, gameInfo };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};

// --게임 정보 전체 불러오기--
interface GetGameAllSuccessResponse extends SuccessResponse {
  gameAll: GetGameAllResDto;
}

export const getGameAllById = async (
  gameId: number
): Promise<ApiResponse<GetGameAllSuccessResponse>> => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      next: { tags: ["game", "game-all"] },
    });

    const gameAll = (await response.json()) as
      | ApiErrorResponse
      | GetGameAllResDto;

    if ("statusCode" in gameAll) {
      return { success: false, error: new Error(gameAll.message) };
    }

    return { success: true, gameAll };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
