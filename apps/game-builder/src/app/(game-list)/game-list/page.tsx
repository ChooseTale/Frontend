import { Suspense } from "react";
import { getGameList } from "@/actions/list/getGameList";
import {
  formatGameListSearchParams,
  type GameListSearchParams,
} from "@/utils/formatGameListSearchParams";
import GameListFilters from "@/components/common/game/game-list-filters/GameListFilters";
import GameList from "./_components/GameList";

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
          <GameListFilters
            searchParams={formattedSearchParams}
            option={{
              sorts: [
                { value: "LATEST", optionLabel: "최신순" },
                { value: "POPULAR", optionLabel: "인기순" },
              ],
            }}
          />
        </div>
        <div className="h-[calc(100vh-12rem)] overflow-y-scroll">
          <GameList firstList={firstGameList} />
        </div>
      </div>
    </Suspense>
  );
}
