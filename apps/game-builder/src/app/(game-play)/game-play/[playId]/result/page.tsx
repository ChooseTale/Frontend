import { notFound } from "next/navigation";
import { getGameResult } from "@/actions/game-play/getGameResult";
import GamePlayChoosenPages from "@/components/game-play/result/GamePlayChoosenPages";
import { type GamePlayParams } from "../page";

export default async function Page({ params }: { params: GamePlayParams }) {
  const { playId } = params;
  const gameInfoResponse = await getGameResult(Number(playId));

  if (isNaN(Number(playId)) || !gameInfoResponse.success) {
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
    </section>
  );
}
