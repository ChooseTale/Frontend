import { notFound } from "next/navigation";
import BackgroundWapper from "@/components/common/BackgroundWapper";
import { getGameIntro } from "@/actions/game-play/getIntro";
import GameIntro from "@/components/game/intro/GameIntro";
import { GamePlayParams } from "../../../(game-play)/game-play/[playId]/page";

export default async function Page({ params }: { params: GamePlayParams }) {
  const { gameId } = params;
  const gameIntroResponse = await getGameIntro(Number(gameId));

  if (isNaN(Number(gameId)) || !gameIntroResponse.success) {
    notFound();
  }

  return (
    <BackgroundWapper>
      <GameIntro
        gameIntroData={gameIntroResponse.intro}
        gameId={Number(gameId)}
      />
    </BackgroundWapper>
  );
}
