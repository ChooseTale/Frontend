"use server";
import api from "@/lib/axios/axios";

export const userLogOut = async () => {
  await api.get(`/user/logout`);
};
