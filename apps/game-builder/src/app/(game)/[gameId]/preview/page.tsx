import { notFound } from "next/navigation";
import DetailGame from "@/components/game/detail/DetailGame";
import { getGameInfoById } from "@/actions/game/getGame";
import { type GameParams } from "../page";

export default async function Page({ params }: { params: GameParams }) {
  const { gameId } = params;
  const gameInfoResponse = await getGameInfoById(Number(gameId));

  if (isNaN(Number(gameId)) || !gameInfoResponse.success) {
    notFound();
  }

  return (
    <DetailGame
      gameInfoData={gameInfoResponse.gameInfo}
      gameId={Number(gameId)}
    />
  );
}
