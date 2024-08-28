"use server";
import { revalidateTag } from "next/cache";
import type { HttpError } from "@choosetale/nestia-type";
import { API_URL } from "@/config/config";
import type { ApiResponse, SuccessResponse } from "../action";

interface Choice {
  title: string;
  description: string;
}

interface SocketMessage {
  message: Choice[];
}

// --게임 정보 불러오기--
interface GetRecommendChoiceSuccessResponse extends SuccessResponse {
  choices: Choice[];
}

export const getRecommendChoice = async (
  gameId: number,
  pageId: number
): Promise<ApiResponse<GetRecommendChoiceSuccessResponse>> => {
  try {
    const response = await fetch(
      `${API_URL}/game/${gameId}/page/${pageId}/recommend-choices`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    revalidateTag("game-all");
    const data = (await response.json()) as SocketMessage;
    return { success: true, choices: data.message };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
