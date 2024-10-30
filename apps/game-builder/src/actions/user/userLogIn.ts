"use server";
import { type Account } from "next-auth";
import type { HttpError } from "@choosetale/nestia-type";
import api from "@/lib/axios/axios";
import type { ApiResponse, SuccessResponse } from "../action";

interface CreateSuccessResponse extends SuccessResponse {
  cookie: string[];
  isFirstLogin: boolean;
}

export const userLogin = async (
  account: Account
): Promise<ApiResponse<CreateSuccessResponse>> => {
  try {
    const { provider: type, access_token: token } = account as {
      provider: string;
      access_token: string;
    };
    const response = await api.post(`/user/login`, {
      token,
      type,
    });
    const cookie = response.headers["set-cookie"];
    const isFirstLogin = response.data as { isFirstLogin: boolean };

    if (!cookie) {
      throw new Error("Failed to login");
    }

    return { success: true, cookie, ...isFirstLogin };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
