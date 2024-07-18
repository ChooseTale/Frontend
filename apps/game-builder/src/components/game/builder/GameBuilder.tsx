"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { GetAllGameResDto } from "@choosetale/nestia-type/lib/structures/GetAllGameResDto";

import useGameData from "@/hooks/useGameData";
import GameSubmitButton from "@/components/button/GameSubmitButton";
import GameBuilderContent from "./GameBuilderContent";
import StoryLine from "./StoryLine";
import { TempGetGameResDto } from "@/actions/getGame";

export default function GameBuilder({
  gameAllData,
  gameData,
}: {
  gameAllData: GetAllGameResDto;
  gameData: TempGetGameResDto;
}) {
  const useGameDataProps = useGameData({ gameAllData, gameData });
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/game/confirm");
  };

  return (
    <form onSubmit={onSubmit} className="flex-1 relative flex px-6 pt-4">
      <StoryLine />
      <GameSubmitButton />

      <div className="flex-1 flex flex-col gap-4 pb-20">
        <GameBuilderContent {...useGameDataProps} />
      </div>
    </form>
  );
}
