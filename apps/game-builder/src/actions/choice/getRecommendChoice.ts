"use server";
import { HttpError } from "@choosetale/nestia-type";
import { ErrorResponse, SuccessResponse } from "../action";

// --게임 정보 불러오기--
export type TempGetRecommendChoiceResDto = any;
interface GetRecommendChoiceSuccessResponse extends SuccessResponse {
  choice: TempGetRecommendChoiceResDto;
}
export type GetRecommendChoiceResponse =
  | GetRecommendChoiceSuccessResponse
  | ErrorResponse;

export const getRecommendChoice = async ({
  gameId,
  pageId,
}: {
  gameId: number;
  pageId: number;
}): Promise<GetRecommendChoiceResponse> => {
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

    const choice = (await response.json()) as TempGetRecommendChoiceResDto;
    return { success: true, choice };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
