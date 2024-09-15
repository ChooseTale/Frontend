import { notFound } from "next/navigation";
import BackgroundWapper from "@/components/common/BackgroundWapper";
import { GamePlayParams } from "../../../(game-play)/game-play/[playId]/page";
import DetailGame from "@/components/game/detail/DetailGame";
import { getGameInfoById } from "@/actions/game/getGame";

export default async function Page({ params }: { params: GamePlayParams }) {
  const { gameId } = params;
  const gameInfoResponse = await getGameInfoById(Number(gameId));

  if (isNaN(Number(gameId)) || !gameInfoResponse.success) {
    notFound();
  }

  return (
    <BackgroundWapper>
      <DetailGame
        gameInfoData={gameInfoResponse.gameInfo}
        playId={Number(gameId)}
      />
    </BackgroundWapper>
  );
}
