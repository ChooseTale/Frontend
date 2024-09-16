"use client";
import Image from "next/image";
import { ClockIcon, InfoCircledIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { AspectRatio } from "@repo/ui/components/ui/AspectRatio";
import type { GameIntro as GameIntroType } from "@/interface/customType";
import DateDisplay from "@/components/common/text/DateDisplay";
import { DynamicViewer } from "@/components/common/viewer/DynamicViewer";
import TextWithCounts from "@/components/common/text/TextWithCounts";
import TextWithNumberRange from "@/components/common/text/TextWithCountsRange";
import GameRestartButton from "@/components/button/GameRestartButton";
import GameContinueButton from "@/components/button/GameContinueButton";
import GameStartButton from "@/components/button/GameStartButton";

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
        <h1 className="text-2xl font-bold">{gameData.title}</h1>
        <div className="my-10">
          <DynamicViewer
            initialEditType="markdown"
            previewStyle="vertical"
            height="600px"
            initialValue={gameData.description}
          />
        </div>

        <div className="xs:mx-6 sm:mx-12 flex flex-col gap-1 flex-1 items-end min-w-[230px]">
          <div className="text-xs flex items-center gap-2" title="작성 날짜">
            <Pencil1Icon color="#28c362" />
            <DateDisplay date={subData.lastUpdatedAt} />
          </div>

          <div className="text-xs flex items-center gap-2" title="작성 날짜">
            <ClockIcon color="#28c362" />
            예상 게임 시간: {subData.expectPlayTime}분
          </div>

          <div className="flex gap-2 flex-wrap" title="게임 상세">
            <InfoCircledIcon color="#28c362" />
            <TextWithCounts
              text="플레이 횟수"
              counts={subData.totalPlayCount}
            />
            <TextWithNumberRange
              text="엔딩"
              value={subData.completedEnding}
              max={subData.totalEnding}
            />
          </div>
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
