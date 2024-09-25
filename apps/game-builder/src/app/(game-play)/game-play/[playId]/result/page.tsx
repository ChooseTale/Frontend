import { notFound } from "next/navigation";
import { getGameResult } from "@/actions/game-play/getGameResult";
import { getGameIntro } from "@/actions/game-play/getIntro";
import { GameIntro } from "@/interface/customType";
import GamePlayChoosenPages from "@/components/game-play/result/GamePlayChoosenPages";
import GameRestartButton from "@/components/button/GameRestartButton";
import GameEnrich from "@/components/game/GameEnrich";
import { type GamePlaySearchParams, type GamePlayParams } from "../page";

export default async function Page({
  params,
  searchParams,
}: {
  params: GamePlayParams;
  searchParams: GamePlaySearchParams;
}) {
  const { playId } = params;
  const { gameId } = searchParams;
  const gameInfoResponse = await getGameResult(Number(playId));
  const gameIntroResponse = await getGameIntro(Number(gameId));

  if (
    !playId ||
    !gameId ||
    !gameInfoResponse.success ||
    !gameIntroResponse.success
  ) {
    notFound();
  }

  const lastPage = gameInfoResponse.result.choosenPages[0];
  const gameEnrich = gameIntroResponse.intro.enrichData;
  const gamePlayResult: Partial<GameIntro["enrichData"]> = {
    totalEnding: gameEnrich.totalEnding,
    totalPlayCount: gameEnrich.totalPlayCount,
    completedEnding: gameEnrich.completedEnding,
  };

  return (
    <section className="my-10">
      <p>엔딩</p>
      <h1 className="text-2xl mb-4">
        {gameInfoResponse.result.endingPage.abridgement}
      </h1>

      {lastPage && <GamePlayChoosenPages page={lastPage} />}

      <GameEnrich enrich={gamePlayResult} />
      <div className="mt-10 mb-4 flex flex-col gap-3">
        <GameRestartButton gameId={Number(gameId)} />
      </div>
    </section>
  );
}
