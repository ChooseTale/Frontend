"use server";
import type { HttpError } from "@choosetale/nestia-type";
import type { CreateChoiceResDto } from "@choosetale/nestia-type/lib/structures/CreateChoiceResDto";
import type { ApiErrorResponse, NewChoice } from "@/interface/customType";
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
    if (choiceData.childPageId < 0)
      throw new Error("Child page id is required");

    const response = await fetch(`${API_URL}/game/${gameId}/choice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(choiceData),
    });
    const choiceRes = (await response.json()) as
      | CreateChoiceResDto
      | ApiErrorResponse;

    if ("statusCode" in choiceRes) {
      throw new Error(choiceRes.message);
    }

    return { success: true, choice: choiceRes };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
