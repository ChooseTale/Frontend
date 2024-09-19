import { notFound } from "next/navigation";
import TopNav from "@/components/common/partial/TopNav";
import ConfirmGame from "@/components/game/confirm/ConfirmGame";
import { getGameInfoById } from "@/actions/game/getGame";
import { type GameParams } from "../page";

export default async function Page({ params }: { params: GameParams }) {
  const { gameId } = params;
  const gameInfoResponse = await getGameInfoById(Number(gameId));

  if (isNaN(Number(gameId)) || !gameInfoResponse.success) {
    notFound();
  }

  return (
    <>
      <TopNav title="새 게임" hasBackButton />
      <div className="w-full px-12 pt-4 pb-10">
        <ConfirmGame
          gameId={Number(gameId)}
          gameInfoData={gameInfoResponse.gameInfo}
        />
      </div>
    </>
  );
}
