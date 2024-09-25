import { notFound } from "next/navigation";
import { getGameResult } from "@/actions/game-play/getGameResult";
import GamePlayChoosenPages from "@/components/game-play/result/GamePlayChoosenPages";
import { GamePlaySearchParams, type GamePlayParams } from "../page";
import GameRestartButton from "@/components/button/GameRestartButton";

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

  if (!playId || !gameId || !gameInfoResponse.success) {
    notFound();
  }

  const lastPage = gameInfoResponse.result.choosenPages[0];

  return (
    <section className="my-10">
      <p>엔딩</p>
      <h1 className="text-2xl mb-4">
        {gameInfoResponse.result.endingPage.abridgement}
      </h1>
      {lastPage && <GamePlayChoosenPages page={lastPage} />}

      <div className="mt-8 mb-4 flex flex-col gap-2">
        <GameRestartButton gameId={Number(gameId)} />
      </div>
    </section>
  );
}
