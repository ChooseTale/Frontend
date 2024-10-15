import { Suspense } from "react";
import { getGameList } from "@/actions/list/getGameList";
import {
  formatGameListSearchParams,
  type GameListSearchParams,
} from "@/utils/formatGameListSearchParams";
import GameList from "./_components/GameList";
import GameListFilters from "./_components/game-list-filters/GameListFilters";

export const dynamic = "force-dynamic";

export interface GameListParams {
  searchParams: GameListSearchParams;
}

export default async function Page({ searchParams }: GameListParams) {
  const formattedSearchParams = formatGameListSearchParams(searchParams);
  const gameListData = await getGameList({
    ...formattedSearchParams,
    page: 1,
  });

  if (!gameListData.data) {
    throw new Error("Failed to fetch game list");
  }
  const firstGameList = gameListData.data;

  return (
    <Suspense fallback={null}>
      <div className="h-[calc(100vh-8rem)] flex flex-col mx-5 pt-4">
        <div className="flex justify-between items-center pb-4">
          <GameListFilters searchParams={formattedSearchParams} />
        </div>
        <div className="h-[calc(100vh-12rem)] overflow-y-scroll">
          <GameList firstList={firstGameList} />
        </div>
      </div>
    </Suspense>
  );
}
