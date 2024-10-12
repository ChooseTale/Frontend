"use server";
import { type Account } from "next-auth";
import { API_URL } from "@/config/config";
import type { HttpError } from "@choosetale/nestia-type";
import type { ApiResponse, SuccessResponse } from "../action";

interface CreateSuccessResponse extends SuccessResponse {
  message: string;
  cookie: string[];
}

export const userLogin = async (
  account: Account
): Promise<ApiResponse<CreateSuccessResponse>> => {
  try {
    const { provider: type, access_token: token } = account as {
      provider: string;
      access_token: string;
    };
    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        type,
      }),
    });

    const data = (await response.json()) as { message: string };

    if (!response.ok) {
      throw new Error(data.message || "Failed to login");
    }

    return { success: true, ...data, cookie: response.headers.getSetCookie() };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
