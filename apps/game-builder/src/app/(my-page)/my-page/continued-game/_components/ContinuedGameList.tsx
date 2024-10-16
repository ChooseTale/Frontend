import { type ContinuedGame } from "@/interface/customType";
import ContinuedGameCard from "../../_components/ContinuedGameCard";

interface ContinuedGameListProps {
  continuedGame: ContinuedGame[];
}

export default function ContinuedGameList({
  continuedGame,
}: ContinuedGameListProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 !gap-y-10 px-6">
      {continuedGame.map((game) => (
        <ContinuedGameCard
          continuedGame={game}
          key={game.game.id}
          className="w-full"
        />
      ))}
    </div>
  );
}
