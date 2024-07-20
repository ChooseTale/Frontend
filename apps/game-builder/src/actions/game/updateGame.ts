"use server";
import * as type from "@choosetale/nestia-type";
import { API_URL } from "@/constant/config";

import { UpdateGameReqDto } from "@choosetale/nestia-type/lib/structures/UpdateGameReqDto";
import { ErrorResponse, SuccessResponse } from "../action";

interface UpdateSuccessResponse extends SuccessResponse {
  game: UpdateGameReqDto;
}
type updateGameResponse = UpdateSuccessResponse | ErrorResponse;

export const updateGame = async (
  formData: UpdateGameReqDto,
  gameId: string
): Promise<updateGameResponse> => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      mode: "no-cors",
    });

    return response.json();
  } catch (error) {
    return { success: false, error: error as type.HttpError };
  }
};
