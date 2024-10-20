import {
  formatGameListSearchParams,
  type GameListSearchParams,
} from "@/utils/formatGameListSearchParams";
import GameListFilters from "@/components/common/game/game-list-filters/GameListFilters";
import TopNav from "@/app/(my-page)/my-page/_components/TopNav";
import NewGameButton from "./_components/NewGameButton";
import GroupTab from "./_components/GroupTab";

export const dynamic = "force-dynamic";

export interface GameListParams {
  searchParams: GameListSearchParams;
}

export default function Page({ searchParams }: GameListParams) {
  const formattedSearchParams = formatGameListSearchParams(searchParams);

  return (
    <div className="flex flex-col">
      <TopNav title="빌더" />
      <GroupTab />
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
      <NewGameButton />
    </div>
  );
}
