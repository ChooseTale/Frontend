"use server";
import api from "@/lib/axios/axios";
import { User } from "@/interface/customType";

export const me = async () => {
  const response = await api.get("/user/me");
  return response.data as User;
};
