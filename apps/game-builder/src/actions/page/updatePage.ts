"use server";
import { revalidateTag } from "next/cache";
import type { HttpError } from "@choosetale/nestia-type";
import type { UpdatePageResDto } from "@choosetale/nestia-type/lib/structures/UpdatePageResDto";
import { API_URL } from "@/config/config";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  page: UpdatePageResDto;
}

export const updatePage = async (
  gameId: number,
  pageId: number,
  pageData: {
    abridgement: string;
    content: string;
    isEnding: boolean;
  }
): Promise<ApiResponse<ApiSuccessResponse>> => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}/page/${pageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pageData),
    });
    const page = (await response.json()) as UpdatePageResDto;

    revalidateTag("game-all");
    return { success: true, page };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
