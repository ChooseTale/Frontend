import { notFound } from "next/navigation";
import BackgroundWapper from "@/components/common/BackgroundWapper";
import { getGameIntro } from "@/actions/game-play/getIntro";
import GameIntro from "@/components/game/intro/GameIntro";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const gameId = Number(id);
  const gameIntroResponse = await getGameIntro(gameId);

  if (isNaN(gameId) || !gameIntroResponse.success) {
    notFound();
  }

  return (
    <BackgroundWapper>
      <GameIntro gameIntroData={gameIntroResponse.intro} gameId={gameId} />
    </BackgroundWapper>
  );
}
