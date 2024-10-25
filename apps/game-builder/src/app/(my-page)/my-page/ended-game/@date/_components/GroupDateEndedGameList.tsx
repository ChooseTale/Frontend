import { type EndedGameGroupDate } from "@/interface/customType";
import GroupDateEndedGameCard from "./GroupDateEndedGameCard";

interface EndedGameListProps {
  endedGame: EndedGameGroupDate[];
}

export default function GroupDateEndedGameList({
  endedGame,
}: EndedGameListProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 !gap-y-6">
      {endedGame.map((game, index) => (
        <GroupDateEndedGameCard
          endedGame={game}
          key={`${game.game.id}-${index}`}
        />
      ))}
    </div>
  );
}
