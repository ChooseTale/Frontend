"use client";
import Link from "next/link";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AspectRatio } from "@repo/ui/components/ui/AspectRatio";
import type { GameInfo } from "@/interface/customType";
import DateDisplay from "@/components/common/text/DateDisplay";
import { DynamicViewer } from "@/components/common/viewer/DynamicViewer";
import { Button } from "@/packages/ui/components/ui/Button";
import { toast } from "@/packages/ui/components/hooks/UseToast";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

export default function DetailGame({
  gameInfoData,
  playId,
}: {
  gameInfoData: GameInfo;
  playId: number;
}) {
  const handleCopy = () => {
    toast({
      title: "Ctrl + V",
      description: "게임 링크가 클립보드에 복사되었습니다.",
    });
  };

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
          />
        </AspectRatio>
        <h3>No: {playId}</h3>
        <p>게임 제목: {gameInfoData.title}</p>
        <p>게임 장르: {gameInfoData.genre}</p>

        <div>
          게임 설명:
          <DynamicViewer
            initialEditType="markdown"
            previewStyle="vertical"
            height="600px"
            initialValue={gameInfoData.description}
          />
        </div>
        <p>비공개 여부: {gameInfoData.isPrivate ? "비공개" : "공개"}</p>
        <p>
          생성날짜: <DateDisplay date={gameInfoData.createdAt} />
        </p>
        <p>페이지 수: {gameInfoData.counts.pages}</p>
        <p>선택지 수: {gameInfoData.counts.choices}</p>
        <p>엔딩 수: {gameInfoData.counts.ending}</p>

        <div className="my-6 flex flex-col gap-4">
          <Link href={`/game-play/${playId}/intro`} className="w-full">
            <Button className="w-full">게임으로</Button>
          </Link>
          <CopyToClipboard
            text={`${window.location.origin}/game-play/${playId}/intro`}
            onCopy={handleCopy}
          >
            <Button variant="outline">
              <div className="flex gap-1 items-center">
                <ExternalLinkIcon />
                링크 복사
              </div>
            </Button>
          </CopyToClipboard>
        </div>
      </div>
    </section>
  );
}
