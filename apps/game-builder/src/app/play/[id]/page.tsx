import GameStart from "@/components/game/play/GameStart";
import BackgroundWapper from "@/components/common/BackgroundWapper";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const gameId = Number(id);

  return (
    <BackgroundWapper>
      <GameStart gameId={gameId} />
    </BackgroundWapper>
  );
}
