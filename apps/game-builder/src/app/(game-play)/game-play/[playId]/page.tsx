import { notFound } from "next/navigation";
import { getGameIntro } from "@/actions/game-play/getIntro";
import GamePlay from "./_components/GamePlay";

export interface GamePageParams {
  params: {
    playId: string;
  };
  searchParams: {
    gameId: string;
  };
}

export default async function Page({ params, searchParams }: GamePageParams) {
  const { playId } = params;
  const { gameId } = searchParams;

  if (!gameId) notFound();
  const response = await getGameIntro(Number(gameId));

  if (!response.success) notFound();

  return (
    <GamePlay
      playId={Number(playId)}
      gameId={Number(gameId)}
      gameIntro={response.intro}
    />
  );
}
