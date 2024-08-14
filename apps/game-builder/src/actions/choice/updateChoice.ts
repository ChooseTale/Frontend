"use server";
import type { HttpError } from "@choosetale/nestia-type";
import type { UpdateChoiceResDto } from "@choosetale/nestia-type/lib/structures/UpdateChoiceResDto";
import type { NewChoice } from "@/interface/customType";
import { API_URL } from "@/config/config";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  choice: UpdateChoiceResDto;
}

export const updateChoice = async (
  gameId: number,
  choiceId: number,
  choiceData: NewChoice
): Promise<ApiResponse<ApiSuccessResponse>> => {
  try {
    const response = await fetch(
      `${API_URL}/game/${gameId}/choice/${choiceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(choiceData),
      }
    );

    const choice = (await response.json()) as UpdateChoiceResDto;

    return { success: true, choice };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
