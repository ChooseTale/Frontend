import GameListFilters from "@/app/(game-list)/list/_components/game-list-filters/GameListFilters";
import { getEndedGame } from "@/actions/my-page/getEndedGame";
import { formatGameListSearchParams } from "@/utils/formatGameListSearchParams";
import { type EndedGameGroupGame } from "@/interface/customType";
import { type GameListParams } from "../page";
import EndedGameList from "./_components/GroupGameEndedGameList";

export const dynamic = "force-dynamic";

export default async function GamePage({ searchParams }: GameListParams) {
  const formattedSearchParams = formatGameListSearchParams(searchParams);

  const endedGame = (await getEndedGame({
    ...formattedSearchParams,
    limit: 8,
    page: 1,
    group: "game",
  })) as EndedGameGroupGame[];

  return (
    <div className="h-[calc(100%-7.25rem)] flex flex-col">
      <div className="flex justify-between items-center mt-4 mb-5 px-5">
        <GameListFilters
          searchParams={formattedSearchParams}
          option={{
            sorts: [
              {
                value: "LATEST",
                optionLabel: "최신순",
              },
              {
                value: "OLDEST",
                optionLabel: "오래된 순",
              },
            ],
          }}
        />
      </div>

      <div className="h-full max-h-full overflow-y-scroll">
        <div className="px-5 pb-20 flex">
          <EndedGameList endedGame={endedGame} />
        </div>
      </div>
    </div>
  );
}
