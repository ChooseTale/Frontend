import { type EndedGame } from "@/interface/customType";
import GroupDateEndedGameCard from "./GroupDateEndedGameCard";

interface EndedGameListProps {
  endedGame: EndedGame[];
}

export default function GroupDateEndedGameList({
  endedGame,
}: EndedGameListProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 !gap-y-6">
      {endedGame.map((game) => (
        <GroupDateEndedGameCard endedGame={game} key={game.game.id} />
      ))}
    </div>
  );
}
