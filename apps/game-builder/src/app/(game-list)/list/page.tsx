import { Suspense } from "react";
import { getGameList } from "@/actions/list/getGameList";
import GameList from "@/components/game-list/GameList";

export interface GameListParams {
  searchParams: {
    page: string;
    genre: string;
    sort: string;
  };
}

export default async function Page({ searchParams }: GameListParams) {
  const params = {
    page: Number(searchParams.page) || 1,
    limit: 10,
    genre: searchParams.genre,
    sort: searchParams.sort || "desc",
  };
  const response = await getGameList(params);

  if (!response.success) {
    throw new Error("Failed to fetch game list");
  }

  return (
    <Suspense fallback={null}>
      <GameList gameList={response.gameList} />
    </Suspense>
  );
}
