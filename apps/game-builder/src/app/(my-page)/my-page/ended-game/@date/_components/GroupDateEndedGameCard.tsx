"use client";
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
  const TEMP_SRC = "";

  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-full pb-[100%] rounded-md overflow-hidden bg-grey-200">
        <ErrorHandlingImage src={TEMP_SRC} alt={endedGame.game.title} />
      </div>

      <div className="h-[88px] flex flex-col justify-between">
        <div>
          <p className="headline line-clamp-2">{endedGame.game.title}</p>
          <p className="caption text-grey-200 text-thin">
            {t(`genre.${endedGame.game.genre}`)}
          </p>
        </div>
        <p className="caption text-thin">
          {formatDateString(endedGame.game.reachedEndingAt)}
        </p>
      </div>
    </div>
  );
}
