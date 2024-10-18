import { Suspense } from "react";
import { getBuilderGameList } from "@/actions/builder/getBuilderGameList";
import {
  formatGameListSearchParams,
  type GameListSearchParams,
} from "@/utils/formatGameListSearchParams";
import GameListFilters from "@/components/common/game/game-list-filters/GameListFilters";
import GameBuilderList from "./_components/GameBuilderList";
import NewGameButton from "./_components/NewGameButton";

export const dynamic = "force-dynamic";

export interface GameListParams {
  searchParams: GameListSearchParams;
}

export default async function Page({ searchParams }: GameListParams) {
  const formattedSearchParams = formatGameListSearchParams(searchParams);

  const builderGames = await getBuilderGameList({
    status: "ALL",
    page: 1,
    limit: 10,
    genre: "ALL",
    sort: "LATEST",
  });

  return (
    <Suspense fallback={null}>
      <div className="h-[calc(100%-3rem)] flex flex-col">
        <div className="flex justify-between items-center mt-4 mb-5 px-5">
          <GameListFilters
            searchParams={formattedSearchParams}
            option={{
              sorts: [
                { value: "LATEST", optionLabel: "최신순" },
                { value: "OLDEST", optionLabel: "오래된순" },
              ],
            }}
          />
        </div>

        <div className="relative h-full max-h-full overflow-y-scroll">
          <div className="px-5 pb-20">
            <GameBuilderList builderGames={builderGames} />
          </div>

          <NewGameButton />
        </div>
      </div>
    </Suspense>
  );
}
