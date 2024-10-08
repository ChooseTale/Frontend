import { SyntheticEvent, useState } from "react";
import Image from "next/image";
import { ImageIcon } from "@radix-ui/react-icons";
import { AspectRatio } from "@/packages/ui/components/ui/AspectRatio";
import { type GameListGame } from "@/interface/customType";
import { useTranslation } from "@/hooks/useTranslation";
import { getPlaceholderImageOnError } from "@/utils/getPlaceholderImageOnError";
import PlayerImages from "./PlayerImages";

export default function GameListCard({ gameData }: { gameData: GameListGame }) {
  const { t } = useTranslation();
  const game = gameData.game;
  const { thumbnail, title, genre } = game;
  const totalRechedEndingPlayCount =
    gameData.enrichData.totalRechedEndingPlayCount;

  const [isError, setIsError] = useState(false);

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    getPlaceholderImageOnError(e);
    setIsError(true);
  };

  return (
    <div>
      <AspectRatio ratio={1 / 1} className="mb-2">
        <Image
          src={thumbnail?.url}
          alt={`thumbnail image ${thumbnail?.id}`}
          className="rounded-md object-cover select-none"
          onError={handleError}
          fill
          sizes="(max-width: 600px) 80vw, 400px"
          style={{ objectFit: "cover" }}
        />
        {isError && (
          <div className="absolute w-full h-full rounded-md border border-red-500 flex justify-center items-center">
            <ImageIcon className="w-10 h-10" color="#aaaaaa" />
            <div className="w-[42px] border-b-2 absolute border-[#aaaaaa] -rotate-45" />
          </div>
        )}
      </AspectRatio>

      <div className="min-h-24 flex flex-col justify-between gap-2">
        <div>
          <p className="headline my-1 break-keep">{title}</p>
          <p className="caption text-grey-200">{t(`genre.${genre}`)}</p>
        </div>
        <div className="flex items-center gap-1">
          {totalRechedEndingPlayCount !== 0 ? (
            <>
              <PlayerImages
                profileIcons={Array(totalRechedEndingPlayCount).fill("")}
              />
              <p className="caption mt-1">
                {totalRechedEndingPlayCount}명이 엔딩을 봤어요
              </p>
            </>
          ) : (
            <p className="caption"> </p>
          )}
        </div>
      </div>
    </div>
  );
}
