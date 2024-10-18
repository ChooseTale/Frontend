import { type ContinuedGame } from "@/interface/customType";

interface EndedGameListProps {
  endedGame: ContinuedGame[];
}

export default function GroupDateEndedGameList({
  endedGame,
}: EndedGameListProps) {
  return (
    <div>
      {endedGame.map((game) => (
        <div key={game.game.id}>{game.game.title}</div>
      ))}
    </div>
  );
}
