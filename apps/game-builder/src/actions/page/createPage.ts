"use server";
import { revalidateTag } from "next/cache";
import type { HttpError } from "@choosetale/nestia-type";
import type { CreatePageResDto } from "@choosetale/nestia-type/lib/structures/CreatePageResDto";
import { API_URL } from "@/config/config";
import type { ApiResponse, SuccessResponse } from "../action";

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

    revalidateTag("game-all");
    return { success: true, page };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
