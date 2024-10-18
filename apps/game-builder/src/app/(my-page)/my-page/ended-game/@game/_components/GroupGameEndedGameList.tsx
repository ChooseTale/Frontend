import { type EndedGame } from "@/interface/customType";

interface EndedGameListProps {
  endedGame: EndedGame[];
}

export default function GroupGameEndedGameList({
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
