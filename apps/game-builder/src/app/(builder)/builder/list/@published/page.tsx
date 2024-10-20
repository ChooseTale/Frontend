import { getBuilderGameList } from "@/actions/builder/getBuilderGameList";
import {
  formatGameListSearchParams,
  type GameListSearchParams,
} from "@/utils/formatGameListSearchParams";
import GameBuilderList from "./_components/GameBuilderList";

export interface GameListParams {
  searchParams: GameListSearchParams;
}

export default async function Page({ searchParams }: GameListParams) {
  const formattedSearchParams = formatGameListSearchParams(searchParams);

  const builderGames = await getBuilderGameList({
    ...formattedSearchParams,
    status: "PUBLISHED",
    page: 1,
    limit: 10,
  });

  return (
    <div className="relative h-full max-h-full overflow-y-scroll">
      <div className="px-5 pb-24">
        <GameBuilderList builderGames={builderGames} />
      </div>
    </div>
  );
}
