"use client";
import { GetAllGameResDto } from "@choosetale/nestia-type/lib/structures/GetAllGameResDto";

import useGameData from "@/hooks/useGameData";
import GameSubmitButton from "@/components/button/GameSubmitButton";
import GameBuilderContent from "./GameBuilderContent";
import StoryLine from "./StoryLine";
import { TempGetGameResDto } from "@/actions/game/getGame";
import { useGameStore } from "@/store/gameStore";

export default function GameBuilder({
  gameAllData,
  gameData,
  gameId,
}: {
  gameAllData: GetAllGameResDto;
  gameData: TempGetGameResDto;
  gameId: number;
}) {
  const { gameInitData } = useGameStore((state) => state);
  const useGameDataProps = useGameData({ gameInitData, gameAllData, gameData });

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
