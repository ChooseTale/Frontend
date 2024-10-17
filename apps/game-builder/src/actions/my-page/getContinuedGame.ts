"use server";
import api from "@/lib/axios/axios";
import { type ContinuedGame } from "@/interface/customType";

export const getContinuedGame = async ({
  page,
  limit,
  genre,
  sort: order,
}: {
  page: number;
  limit: number;
  genre: string;
  sort: string;
}) => {
  const response = await api.get("/my-page/continued-game", {
    params: {
      page,
      limit,
      genre,
      order,
    },
  });
  return response.data as ContinuedGame[];
};
