import { Suspense } from "react";
import { getGameList } from "@/actions/list/getGameList";
import {
  formatGameListSearchParams,
  type GameListSearchParams,
} from "@/utils/formatGameListSearchParams";
import GameList from "@/components/game-list/GameList";
import GameListFilters from "@/components/game-list/GameListFilters";
import GameListCount from "@/components/game-list/GameListCount";

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
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center px-10">
          <GameListCount genre={formattedSearchParams.genre} />
          <GameListFilters searchParams={formattedSearchParams} />
        </div>
        <div className="py-5 h-[calc(100vh-140px)] overflow-y-scroll">
          <GameList firstList={response.gameList} />
        </div>
      </div>
    </Suspense>
  );
}
