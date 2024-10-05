import { Suspense } from "react";
import { getGameList } from "@/actions/list/getGameList";
import {
  formatGameListSearchParams,
  type GameListSearchParams,
} from "@/utils/formatGameListSearchParams";
import GameList from "@/components/game-list/GameList";
import GameListFilters from "@/components/game-list/GameListFilters";

export const dynamic = "force-dynamic";

export interface GameListParams {
  searchParams: GameListSearchParams;
}

export default async function Page({ searchParams }: GameListParams) {
  const formattedParams = formatGameListSearchParams(searchParams);
  const response = await getGameList(formattedParams);

  if (!response.success) {
    throw new Error("Failed to fetch game list");
  }

  return (
    <Suspense fallback={null}>
      <GameListFilters searchParams={searchParams.toString()} />
      <GameList firstList={response.gameList} />
    </Suspense>
  );
}
