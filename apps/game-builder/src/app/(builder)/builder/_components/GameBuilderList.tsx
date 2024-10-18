import { type GameBuilderGame } from "@/interface/customType";

export default function GameBuilderList({
  builderGames,
}: {
  builderGames: GameBuilderGame;
}) {
  if (builderGames.games.length === 0) {
    return (
      <div className="absolute left-0 top-0 right-0 bottom-0 flex justify-center items-center">
        <p className="headline text-grey-400 text-center">
          현재 제작한 게임이 없어요.
          <br />
          게임을 제작해볼까요?
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {builderGames.games.map((game) => (
        <div key={game.id}>{game.title}</div>
      ))}
    </div>
  );
}
