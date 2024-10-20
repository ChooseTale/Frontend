"use client";
import Link from "next/link";
import ImageWithError from "@/components/common/image/ImageWithError";
import { useTranslation } from "@/hooks/useTranslation";
import { formatDateString } from "@/utils/formatDatestring";
import { type GameBuilderGame as GameBuilder } from "@/interface/customType";

interface GameBuilderCardProps {
  game: GameBuilder["games"][number];
}

export default function GameBuilderCard({ game }: GameBuilderCardProps) {
  const { t } = useTranslation();

  return (
    <Link href={`/game/${game.id}/builder`}>
      <div className="border border-grey-800 rounded-md overflow-hidden">
        <div className="flex flex-col gap-2 p-4 pb-5 font-semibold ">
          <div className="body text-grey-300 flex justify-between">
            <p>제작중</p>
            <p className="body font-normal text-grey-300">
              {formatDateString(game.updatedAt)} 수정
            </p>
          </div>

          <div className="flex gap-3">
            <div className="w-[3.75rem] shrink-0">
              <div className="relative w-full pb-[100%] rounded-md overflow-hidden bg-grey-200">
                <ImageWithError src={game.thumbnail.url} alt={game.title} />
              </div>
            </div>

            <div className="flex flex-col">
              <p className="caption text-grey-200 font-normal mb-1">
                {t(`genre.${game.genre}`)}
              </p>
              <p className="headline line-clamp-2">{game.title}</p>
              <p className="body font-normal text-grey-300 line-clamp-2 mb-1">
                {game.firstPageAbridgement}
              </p>
              <div className="flex gap-1">
                <div className="bg-grey-800 h-5 px-1.5 flex items-center justify-center rounded-sm">
                  <p className="text-caption text-green-500 font-semibold">
                    엔딩 {game.count.endingCount}개
                  </p>
                </div>
                <div className="bg-grey-800 h-5 px-1.5 flex items-center justify-center rounded-sm">
                  <p className="text-caption text-green-500 font-semibold">
                    선택지 {game.count.choiceCount}개
                  </p>
                </div>
                <div className="bg-grey-800 h-5 px-1.5 flex items-center justify-center rounded-sm">
                  <p className="text-caption text-green-500 font-semibold">
                    페이지 {game.count.pageCount}개
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
