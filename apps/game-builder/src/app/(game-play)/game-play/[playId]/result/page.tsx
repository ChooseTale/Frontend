import { notFound } from "next/navigation";
import { getGameResult } from "@/actions/game-play/getGameResult";
import { getGameIntro } from "@/actions/game-play/getIntro";
import { type GameIntro } from "@/interface/customType";
import GamePlayChoosenPages from "@/components/game-play/result/GamePlayChoosenPages";
import GameRestartButton from "@/components/button/GameRestartButton";
import GameEnrich from "@/components/game/GameEnrich";
import { type GamePageParams } from "../page";

export default async function Page({ params, searchParams }: GamePageParams) {
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

  const choosenPages = gameInfoResponse.result.choosenPages;
  const gameEnrich = gameIntroResponse.intro.enrichData;
  const gamePlayResult: Partial<GameIntro["enrichData"]> = {
    totalEnding: gameEnrich.totalEnding,
    totalPlayCount: gameEnrich.totalPlayCount,
    completedEnding: gameEnrich.completedEnding,
  };

  return (
    <section className="my-10">
      <p className="mb-2">엔딩</p>
      <h1 className="text-2xl mb-6">
        {gameInfoResponse.result.endingPage.abridgement}
      </h1>

      <hr className="border-black my-4 pointer-none" />
      <h2 className="text-md mb-1">선택한 페이지:</h2>
      {choosenPages.map((page) => (
        <GamePlayChoosenPages key={page.id} page={page} />
      ))}
      <hr className="border-black my-4 pointer-none" />

      <GameEnrich enrich={gamePlayResult} />
      <div className="mt-10 mb-4 flex flex-col gap-3">
        <GameRestartButton gameId={Number(gameId)} />
      </div>
    </section>
  );
}
