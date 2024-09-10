"use server";
import { revalidateTag } from "next/cache";
import type { HttpError } from "@choosetale/nestia-type";
import { API_URL } from "@/config/config";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  text: string;
}

export const checkSpelling = async (
  gameId: number,
  text: string
): Promise<ApiResponse<ApiSuccessResponse>> => {
  const payload = { text };
  try {
    const response = await fetch(
      `${API_URL}/game/${gameId}/page/check-spelling`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const { text } = await response.json();
    console.log(text);

    revalidateTag("game-all");
    return { success: true, text };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
