"use server";
import { type Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import api from "@/lib/axios/axios";
import { type GameBuilderGame } from "@/interface/customType";

type BuilderStatus = "PUBLISHED" | "BUILDING" | "ALL";

export const getBuilderGameList = async ({
  page,
  limit,
  genre,
  sort: order,
  status,
}: {
  status: BuilderStatus;
  page: number;
  limit: number;
  genre: Genres | "ALL";
  sort: string;
}) => {
  const response = await api.get("/my-page/game-builder", {
    params: {
      page,
      limit,
      genre,
      order,
      status,
    },
  });
  return response.data as GameBuilderGame;
};
