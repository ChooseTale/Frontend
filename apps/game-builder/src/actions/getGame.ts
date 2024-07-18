"use server";
import { API_URL } from "@/constant/config";
import { HttpError } from "@choosetale/nestia-type";
import { ErrorResponse, SuccessResponse } from "./action";
import { GetAllGameResDto as GetGameAllResDto } from "@choosetale/nestia-type/lib/structures/GetAllGameResDto";

// --게임 정보 불러오기--
export type TempGetGameResDto = any;
interface GetGameDataSuccessResponse extends SuccessResponse {
  gameData: TempGetGameResDto;
}
export type GetGameDataResponse = GetGameDataSuccessResponse | ErrorResponse;

export const getGameById = async (
  gameId: string
): Promise<GetGameDataResponse> => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}/data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    });

    const gameData = (await response.json()) as TempGetGameResDto;
    return { success: true, gameData };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};

// --게임 정보 전체 불러오기--
interface GetGameAllSuccessResponse extends SuccessResponse {
  gameAll: GetGameAllResDto;
}
export type GetGameAllResponse = GetGameAllSuccessResponse | ErrorResponse;

export const getGameAllById = async (
  gameId: string
): Promise<GetGameAllResponse> => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    });

    const gameAll = (await response.json()) as GetGameAllResDto;
    return { success: true, gameAll };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
