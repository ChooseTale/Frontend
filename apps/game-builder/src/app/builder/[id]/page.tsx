import { getGameAllById, getGameById } from "@/actions/game/getGame";
import GameBuilder from "@/components/game/builder/GameBuilder";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const gameAllResponse = await getGameAllById(id);
  const gameDataResponse = await getGameById(id);

  if (
    gameAllResponse.success === false ||
    gameDataResponse.success === false ||
    !gameAllResponse.gameAll ||
    !gameDataResponse.gameData
  ) {
    notFound();
  }

  return (
    <GameBuilder
      gameAllData={gameAllResponse.gameAll}
      gameData={gameDataResponse.gameData}
    />
  );
}
