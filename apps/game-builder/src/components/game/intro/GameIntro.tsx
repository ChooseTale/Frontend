"use client";
import Image from "next/image";
import { AspectRatio } from "@repo/ui/components/ui/AspectRatio";
import type { GameIntro as GameIntroType } from "@/interface/customType";
import GameRestartButton from "@/components/button/GameRestartButton";
import GameContinueButton from "@/components/button/GameContinueButton";
import GameStartButton from "@/components/button/GameStartButton";
import TypingHtml from "@/components/common/text/TypingHtml";
import TypingTextWithCursor from "@/components/common/text/TypingTextWithCursor";
import GameEnrich from "@/components/game/GameEnrich";

export default function GameIntro({
  gameIntroData,
  gameId,
}: {
  gameIntroData: GameIntroType;
  gameId: number;
}) {
  const gameData = gameIntroData.game;
  const subData = gameIntroData.enrichData;
  const playData = gameIntroData.play;
  const playId = playData.id;

  return (
    <section className="pt-10 text-center">
      <div className="flex flex-col gap-1">
        <div className="xs:mx-6 sm:mx-12 mb-4">
          <AspectRatio ratio={9 / 9} className="mb-2">
            {gameData?.thumbnailUrl && (
              <Image
                className="w-full h-full rounded-xl"
                src={gameData.thumbnailUrl}
                alt="game thumbnail"
                width={300}
                height={200}
              />
            )}
          </AspectRatio>
        </div>
        <h1 className="text-2xl font-bold">
          <TypingTextWithCursor text={gameData.title} />
        </h1>
        <div className="my-10">
          <TypingHtml htmlContent={gameData.description} initialDelay={1.5} />
        </div>

        <div className="xs:mx-6 sm:mx-12 flex flex-col gap-1 flex-1 items-end min-w-[230px]">
          <GameEnrich enrich={subData} />
        </div>
        <div className="xs:mx-6 sm:mx-12 my-6 flex flex-col gap-3">
          {playId === undefined ? (
            <GameStartButton gameId={gameId} />
          ) : (
            <>
              <GameContinueButton
                gameId={gameId}
                playId={playId}
                lastPageAbridgement={playData.page.abridgement}
              />
              <GameRestartButton gameId={gameId} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
