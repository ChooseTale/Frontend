"use server";
import type { HttpError } from "@choosetale/nestia-type";
import type { CreateChoiceResDto } from "@choosetale/nestia-type/lib/structures/CreateChoiceResDto";
import type { NewChoice } from "@/interface/customType";
import { API_URL } from "@/config/config";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  choice: CreateChoiceResDto;
}

export const createChoice = async (
  gameId: number,
  choiceData: NewChoice
): Promise<ApiResponse<ApiSuccessResponse>> => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}/choice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(choiceData),
    });
    const choice = (await response.json()) as CreateChoiceResDto;

    return { success: true, choice };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
