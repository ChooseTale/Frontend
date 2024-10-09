import { notFound } from "next/navigation";
import { getGameAllById } from "@/actions/game/getGame";
import GameBuilder from "@/app/(game)/[gameId]/builder/_components/GameBuilder";
import TopNav from "@/components/common/partial/TopNav";
import { NextButton } from "@/components/common/button/NextButton";
import { type GameParams } from "../page";

export default async function Page({ params }: { params: GameParams }) {
  const { gameId } = params;
  const gameAllResponse = await getGameAllById(Number(gameId));

  if (isNaN(Number(gameId)) || !gameAllResponse.success) {
    notFound();
  }

  return (
    <>
      <TopNav title="새 게임" isSticky={false}>
        <NextButton nextTo={`/game/${gameId}/confirm`} />
      </TopNav>
      <GameBuilder
        gameId={Number(gameId)}
        gameBuildData={gameAllResponse.gameAll}
      />
    </>
  );
}
