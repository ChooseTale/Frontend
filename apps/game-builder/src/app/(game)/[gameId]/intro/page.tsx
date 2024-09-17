import { notFound } from "next/navigation";
import { getGameIntro } from "@/actions/game-play/getIntro";
import GameIntro from "@/components/game/intro/GameIntro";
import { type GameParams } from "../page";

export default async function Page({ params }: { params: GameParams }) {
  const { gameId } = params;
  const gameIntroResponse = await getGameIntro(Number(gameId));

  if (isNaN(Number(gameId)) || !gameIntroResponse.success) {
    notFound();
  }

  return (
    <GameIntro
      gameIntroData={gameIntroResponse.intro}
      gameId={Number(gameId)}
    />
  );
}
