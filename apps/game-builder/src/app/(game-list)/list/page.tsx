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
  const formattedSearchParams = formatGameListSearchParams(searchParams);
  const response = await getGameList({
    ...formattedSearchParams,
    page: 1,
  });

  if (!response.success) {
    throw new Error("Failed to fetch game list");
  }

  return (
    <Suspense fallback={null}>
      <div className="h-[calc(100vh-8rem)] flex flex-col mx-5 pt-4">
        <div className="flex justify-between items-center pb-4">
          <GameListFilters searchParams={formattedSearchParams} />
        </div>
        <div className="h-[calc(100vh-12rem)] overflow-y-scroll bg-red-500">
          <GameList firstList={response.gameList} />
        </div>
      </div>
    </Suspense>
  );
}
