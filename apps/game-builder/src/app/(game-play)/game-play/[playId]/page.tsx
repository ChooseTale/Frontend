import GamePlay from "@/components/game-play/play/GamePlay";

export interface GamePlayParams {
  playId: string;
}

export default function Page({ params }: { params: GamePlayParams }) {
  const { playId } = params;

  return <GamePlay playId={playId} />;
}
