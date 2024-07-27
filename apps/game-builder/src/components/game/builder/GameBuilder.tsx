"use client";
import { GetAllGameResDto } from "@choosetale/nestia-type/lib/structures/GetAllGameResDto";
import useGameData from "@/hooks/useGameData";
import GameSubmitButton from "@/components/button/GameSubmitButton";
import GameBuilderContent from "./GameBuilderContent";
import StoryLine from "./StoryLine";
import { useGameStore } from "@/store/gameStore";
import { GameBuild } from "@/interface/customType";

export default function GameBuilder({
  gameBuildData,
  gameId,
}: {
  gameBuildData: GameBuild;
  gameId: number;
}) {
  const { createdGame } = useGameStore((state) => state);
  const useGameDataProps = useGameData({
    createdGame,
    gameBuildData,
  });

  return (
    <div className="flex-1 relative flex px-6 pt-4">
      <StoryLine />
      <GameSubmitButton />

      <div className="flex-1 flex flex-col gap-4 pb-20">
        <GameBuilderContent {...useGameDataProps} gameId={gameId} />
      </div>
    </div>
  );
}
