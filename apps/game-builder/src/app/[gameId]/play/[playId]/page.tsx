import GameStart from "@/components/game/play/GameStart";
import BackgroundWapper from "@/components/common/BackgroundWapper";

export interface GamePlayParams {
  gameId: string;
  playId: string;
}

export default function Page({ params }: { params: GamePlayParams }) {
  const { gameId } = params;

  return (
    <BackgroundWapper>
      <GameStart gameId={Number(gameId)} />
    </BackgroundWapper>
  );
}
