"use server";
import type { HttpError } from "@choosetale/nestia-type";
import { API_URL } from "@/config/config";
import type { ApiResponse, SuccessResponse } from "../action";

interface CreateSuccessResponse extends SuccessResponse {
  message: string;
}

export const userLogOut = async (): Promise<
  ApiResponse<CreateSuccessResponse>
> => {
  try {
    const response = await fetch(`${API_URL}/user/logout`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to logout");
    }

    return { success: true, ...data };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
