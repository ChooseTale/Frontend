import { type GameListSearchParams } from "@/utils/formatGameListSearchParams";
import TopNav from "../_components/TopNav";
import GroupTab from "./_components/GroupTab";

export interface GameListParams {
  searchParams: GameListSearchParams;
}

export default function Page() {
  return (
    <div className="flex flex-col">
      <TopNav title="내가 본 엔딩" hasBackButton page="/my-page" />
      <GroupTab />
    </div>
  );
}
