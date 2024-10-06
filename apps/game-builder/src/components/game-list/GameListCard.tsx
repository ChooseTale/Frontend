import { type GameListGame } from "@/interface/customType";

export default function GameListCard({ gameData }: { gameData: GameListGame }) {
  return (
    <div className="border border-black p-10 mx-10 mb-10">
      <p>{gameData.game.title}</p>
      {gameData.game.id}
      <p>{gameData.publisher.nickname}</p>
    </div>
  );
}
