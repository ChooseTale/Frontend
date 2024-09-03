"use client";
import Image from "next/image";
import { AspectRatio } from "@repo/ui/components/ui/AspectRatio";
import type { GameInfo } from "@/interface/customType";
import DateDisplay from "@/components/common/text/DateDisplay";
import { DynamicViewer } from "@/components/common/viewer/DynamicViewer";

export default function DetailGame({
  gameInfoData,
  gameId,
}: {
  gameInfoData: GameInfo;
  gameId: number;
}) {
  return (
    <section className="relative px-4 ">
      <header className="flex items-end gap-3 mt-4 mb-4">
        <h1 className="text-2xl font-bold">게임 상세 정보</h1>
      </header>
      <div className="flex flex-col gap-1">
        <AspectRatio ratio={9 / 9} className="mb-2">
          <Image
            className="w-full h-full bg-blue-100 rounded-xl"
            src={gameInfoData.thumbnails[0].url}
            alt="game thumbnail"
            width={300}
            height={200}
            objectFit="contain"
          />
        </AspectRatio>
        <h3>No: {gameId}</h3>
        <p>게임 제목: {gameInfoData.title}</p>
        <p>게임 장르: {gameInfoData.genre}</p>

        <p>
          게임 설명:
          <DynamicViewer
            initialEditType="markdown"
            previewStyle="vertical"
            height="600px"
            initialValue={gameInfoData.description}
          />
        </p>
        <p>비공개 여부: {gameInfoData.isPrivate ? "비공개" : "공개"}</p>
        <p>
          생성날짜: <DateDisplay date={gameInfoData.createdAt} />
        </p>
        <p>페이지 수: {gameInfoData.counts.pages}</p>
        <p>선택지 수: {gameInfoData.counts.choices}</p>
        <p>엔딩 수: {gameInfoData.counts.ending}</p>
      </div>
    </section>
  );
}
