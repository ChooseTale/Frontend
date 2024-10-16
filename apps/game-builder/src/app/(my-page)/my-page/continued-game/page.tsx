import { getContinuedGame } from "@/actions/my-page/getContinuedGame";
import GameListFilters from "@/app/(game-list)/list/_components/game-list-filters/GameListFilters";
import {
  formatGameListSearchParams,
  type GameListSearchParams,
} from "@/utils/formatGameListSearchParams";
import TopNav from "../_components/TopNav";
import ContinuedGameList from "./_components/ContinuedGameList";

export interface GameListParams {
  searchParams: GameListSearchParams;
}

export default async function Page({ searchParams }: GameListParams) {
  const formattedSearchParams = formatGameListSearchParams(searchParams);
  const continuedGame = await getContinuedGame({
    page: 1,
    limit: 8,
    genre: "ALL",
    order: "LATEST",
  });

  return (
    <div className="h-full flex flex-col">
      <TopNav title="진행 중인 게임" hasBackButton page="/my-page" />
      <div className="flex justify-between items-center mt-4 mb-5 px-6">
        <GameListFilters searchParams={formattedSearchParams} />
      </div>
      <div className="flex-1 overflow-y-scroll pb-20">
        <ContinuedGameList continuedGame={continuedGame} />
      </div>
    </div>
  );
}
