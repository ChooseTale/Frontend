import { notFound } from "next/navigation";
import BackgroundWapper from "@/components/common/BackgroundWapper";
import { getGameResult } from "@/actions/game-play/getGameResult";
import GameResult from "@/components/game/result/GameResult";
import { Button } from "@/packages/ui/components/ui/Button";
import { GamePlayParams } from "../page";
import LinkedButton from "@/components/common/button/LinkedButton";

export default async function Page({ params }: { params: GamePlayParams }) {
  const { playId, gameId } = params;
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

        <Button
          className="w-full"
          variant="outline"
          // onClick={handleRestartClick}
        ></Button>
        <LinkedButton
          buttonText="새로 하기"
          to={`/game/${gameId}/play/?play=first-start`}
        />
      </section>
    </BackgroundWapper>
  );
}
