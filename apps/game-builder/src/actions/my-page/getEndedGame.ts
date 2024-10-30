"use server";
import api from "@/lib/axios/axios";
import {
  type EndedGameGroupDate,
  type EndedGameGroupGame,
} from "@/interface/customType";

type Group = "game" | "date";

export const getEndedGame = async ({
  page,
  limit,
  genre,
  order,
  group,
}: {
  page: number;
  limit: number;
  genre: string;
  order: string;
  group: Group;
}) => {
  const groupApi = group === "game" ? "/group-game" : "";

  const response = await api.get(`/my-page/ended-game${groupApi}`, {
    params: {
      page,
      limit,
      genre,
      order,
    },
  });
  return response.data as (EndedGameGroupDate | EndedGameGroupGame)[];
};
