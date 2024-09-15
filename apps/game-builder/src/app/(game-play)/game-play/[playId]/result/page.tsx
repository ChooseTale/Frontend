import { notFound } from "next/navigation";
import BackgroundWapper from "@/components/common/BackgroundWapper";
import { getGameResult } from "@/actions/game-play/getGameResult";
import GameResult from "@/components/game-play/result/GameResult";
import { GamePlayParams } from "../page";

export default async function Page({ params }: { params: GamePlayParams }) {
  const { playId } = params;
  const gameInfoResponse = await getGameResult(Number(playId));

  if (isNaN(Number(playId)) || !gameInfoResponse.success) {
    notFound();
  }

  const lastPage = gameInfoResponse.result.chosenPages[0];

  return (
    <BackgroundWapper>
      <section className="my-10">
        <h1 className="text-2xl mb-4">
          엔딩: {gameInfoResponse.result.endingPage.abridgement}
        </h1>
        {lastPage && <GameResult page={lastPage} />}
      </section>
    </BackgroundWapper>
  );
}
