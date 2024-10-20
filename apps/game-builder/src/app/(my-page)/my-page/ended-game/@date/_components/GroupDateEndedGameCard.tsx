"use client";
import Link from "next/link";
import { type EndedGameGroupDate } from "@/interface/customType";
import { useTranslation } from "@/hooks/useTranslation";
import { formatDateString } from "@/utils/formatDatestring";
import ErrorHandlingImage from "@components/common/image/ImageWithError";

interface EndedGameCardProps {
  endedGame: EndedGameGroupDate;
}

export default function GroupDateEndedGameCard({
  endedGame,
}: EndedGameCardProps) {
  const { t } = useTranslation();
  const TEMP_PLAY_ID = 1;

  return (
    <Link
      href={`/game-play/${TEMP_PLAY_ID}/result?gameId=${endedGame.game.id}`}
    >
      <div className="flex flex-col gap-2">
        <div className="relative w-full pb-[100%] rounded-md overflow-hidden bg-grey-200">
          <ErrorHandlingImage
            src={endedGame.game.thumbnail.url}
            alt={endedGame.game.title}
          />
        </div>

        <div className="h-[88px] flex flex-col justify-between">
          <div>
            <p className="headline line-clamp-2">{endedGame.game.title}</p>
            <p className="caption text-grey-200 font-normal">
              {t(`genre.${endedGame.game.genre}`)}
            </p>
          </div>
          <p className="caption font-normal">
            {formatDateString(endedGame.game.reachedEndingAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}
