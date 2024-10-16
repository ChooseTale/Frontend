import { getContinuedGame } from "@/actions/my-page/getContinuedGame";
import TopNav from "../_components/TopNav";
import ContinuedGameList from "./_components/ContinuedGameList";

export default async function Page() {
  const continuedGame = await getContinuedGame({
    page: 1,
    limit: 8,
    genre: "ALL",
    order: "LATEST",
  });

  return (
    <div className="h-full flex flex-col pb-20">
      <TopNav title="진행 중인 게임" hasBackButton page="/my-page" />
      <ContinuedGameList
        continuedGame={[
          ...continuedGame,
          ...continuedGame,
          ...continuedGame,
          ...continuedGame,
        ]}
      />
    </div>
  );
}
