import { notFound } from "next/navigation";
import { getGameAllById } from "@/actions/game/getGame";
import GameBuilder from "@/components/game/builder/GameBuilder";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const gameId = +id;
  const gameAllResponse = await getGameAllById(id);

  if (
    isNaN(gameId) ||
    gameAllResponse.success === false ||
    !gameAllResponse.gameAll
  ) {
    notFound();
  }

  return (
    <GameBuilder gameId={gameId} gameBuildData={gameAllResponse.gameAll} />
  );
}
