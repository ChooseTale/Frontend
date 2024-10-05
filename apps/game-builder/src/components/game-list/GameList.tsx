import { type GameList as GameListType } from "@/interface/customType";
import GameListCard from "./GameListCard";

export default function GameList({ gameList }: { gameList: GameListType }) {
  return (
    <>
      {gameList.map((e) => (
        <GameListCard gameData={e} key={e.game.id} />
      ))}
    </>
  );
}
