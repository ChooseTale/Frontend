"use server";
import type { HttpError } from "@choosetale/nestia-type";
import { API_URL } from "@/constant/config";
import type { ApiResponse, SuccessResponse } from "../action";
import { CreatePageResDto } from "@choosetale/nestia-type/lib/structures/CreatePageResDto";

interface CreateSuccessResponse extends SuccessResponse {
  page: CreatePageResDto;
}

export const createPage = async (
  gameId: number,
  pageData: { isEnding: boolean; content: string }
): Promise<ApiResponse<CreateSuccessResponse>> => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}/page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pageData),
    });
    const page = (await response.json()) as CreatePageResDto;

    return { success: true, page };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
