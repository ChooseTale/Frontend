import GamePlay from "@/components/game-play/play/GamePlay";
import BackgroundWapper from "@/components/common/BackgroundWapper";

export interface GamePlayParams {
  playId: string;
}

export default function Page({ params }: { params: GamePlayParams }) {
  const { playId } = params;

  return (
    <BackgroundWapper>
      <GamePlay playId={playId} />
    </BackgroundWapper>
  );
}
