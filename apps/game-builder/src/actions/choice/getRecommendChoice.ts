"use server";
import type { HttpError } from "@choosetale/nestia-type";
import type { ErrorResponse, SuccessResponse } from "../action";

// --게임 정보 불러오기--
interface GetRecommendChoiceSuccessResponse extends SuccessResponse {
  choices: {
    title: string;
    description: string;
  }[];
}
export type GetRecommendChoiceResponse =
  | GetRecommendChoiceSuccessResponse
  | ErrorResponse;

export const getRecommendChoice = async (
  gameId: number,
  pageId: number
): Promise<GetRecommendChoiceResponse> => {
  try {
    const response = await fetch(
      `/game/${gameId}/page/${pageId}/recommend-choices`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      }
    );

    const choices = await response.json();
    return { success: true, choices };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
