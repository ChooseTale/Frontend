"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClockIcon, InfoCircledIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { AspectRatio } from "@repo/ui/components/ui/AspectRatio";
import type { GameIntro as GameIntroType } from "@/interface/customType";
import DateDisplay from "@/components/common/text/DateDisplay";
import { DynamicViewer } from "@/components/common/viewer/DynamicViewer";
import { Button } from "@/packages/ui/components/ui/Button";
import TextWithCounts from "@/components/common/text/TextWithCounts";
import TextWithNumberRange from "@/components/common/text/TextWithCountsRange";

export default function GameIntro({
  gameIntroData,
  gameId,
}: {
  gameIntroData: GameIntroType;
  gameId: number;
}) {
  const router = useRouter();
  const gameData = gameIntroData.game;
  const subData = gameIntroData.enrichData;
  // FIXME: api에서 받은 값으로 변경할 것
  const isFirstStart = gameIntroData.enrichData;

  const handleRestartClick = () => {
    if (confirm("게임을 처음부터 시작하시겠습니까?")) {
      router.push(`/game/${gameId}/play/?play=first`);
    }
  };

  return (
    <section className="pt-10 text-center">
      <div className="flex flex-col gap-1">
        <div className="xs:mx-6 sm:mx-12 mb-4">
          <AspectRatio ratio={9 / 9} className="mb-2">
            {/* <Image
              className="w-full h-full bg-blue-100 rounded-xl"
              src={gameData.thumbnailUrl}
              alt="game thumbnail"
              width={300}
              height={200}
            /> */}
            <div className="bg-blue-300 w-full h-full temp" />
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
            예상 게임 시간: {subData.expectPlayTime}
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
        <div className="xs:mx-6 sm:mx-12 my-6 flex flex-col gap-4">
          <div className="text-xs">마지막 플레이한 페이지 요약</div>
          {!isFirstStart ? (
            <>
              <Link
                href={`gameId/${gameId}/play/${gameId}?play=continue`}
                className="w-full"
              >
                <Button className="w-full">이어하기</Button>
              </Link>
              <Button
                className="w-full"
                variant="outline"
                onClick={handleRestartClick}
              >
                새로 하기
              </Button>
            </>
          ) : (
            <Link
              href={`gameId/${gameId}/play/${gameId}?play=first-start`}
              className="w-full"
            >
              <Button className="w-full" variant="outline">
                게임 시작
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
