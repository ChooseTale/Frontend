import { notFound } from "next/navigation";
import { getGameInfoById } from "@/actions/game/getGame";
import DetailGame from "@/components/temp/detail/DetailGame";

export interface GameParams {
  gameId: string;
  locale?: "ko" | "en";
}

export default async function Page({ params }: { params: GameParams }) {
  const { gameId } = params;
  const gameInfoResponse = await getGameInfoById(Number(gameId));

  if (isNaN(Number(gameId)) || !gameInfoResponse.success) {
    notFound();
  }

  return (
    <DetailGame
      gameId={Number(gameId)}
      gameInfoData={gameInfoResponse.gameInfo}
    />
  );
}
