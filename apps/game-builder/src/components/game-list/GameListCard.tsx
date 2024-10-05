import { type GameListGame } from "@/interface/customType";

export default function GameListCard({ gameData }: { gameData: GameListGame }) {
  return (
    <div className="border border-black p-10 m-10">
      <p>{gameData.game.title}</p>
      <p>{gameData.publisher.nickname}</p>
    </div>
  );
}
