"use server";
import { API_URL } from "@/constant/config";
import { HttpError } from "@choosetale/nestia-type";
import { ErrorResponse, SuccessResponse } from "./action";
import { CreateGameReqDto } from "@choosetale/nestia-type/lib/structures/CreateGameReqDto";
import { CreateGameResDto } from "@choosetale/nestia-type/lib/structures/CreateGameResDto";

interface CreateSuccessResponse extends SuccessResponse {
  game: CreateGameResDto;
}
type CreateGameResponse = CreateSuccessResponse | ErrorResponse;

export const createGame = async (
  formData: CreateGameReqDto
): Promise<CreateGameResponse> => {
  try {
    const response = await fetch(`${API_URL}/game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      mode: "no-cors",
    });

    return response.json();
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
