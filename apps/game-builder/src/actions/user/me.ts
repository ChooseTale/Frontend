"use server";
import api from "@/lib/axios/axios";
import type { User } from "@/interface/customType";

export const me = async () => {
  try {
    const response = await api.get("/user/me");
    return response.data as User;
  } catch (error) {
    return null;
  }
};
