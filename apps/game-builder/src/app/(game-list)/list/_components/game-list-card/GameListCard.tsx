import { type SyntheticEvent, useState } from "react";
import Image from "next/image";
import { ImageIcon } from "@radix-ui/react-icons";
import { AspectRatio } from "@/packages/ui/components/ui/AspectRatio";
import { type GameListGame } from "@/interface/customType";
import { useTranslation } from "@/hooks/useTranslation";
import {
  getPlaceholderImageOnError,
  placeholderSrc,
} from "@/utils/getPlaceholderImageOnError";
import CompleteBadge from "../CompleteBadge";
import PlayerImages from "./PlayerImages";

export default function GameListCard({ gameData }: { gameData: GameListGame }) {
  const { t } = useTranslation();
  const [isError, setIsError] = useState(false);

  const game = gameData.game;
  if (!game) return null;

  const { thumbnail, title, genre } = game;
  const totalRechedEndingPlayCount =
    gameData.enrichData.totalRechedEndingPlayCount;

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    if (isError) return;
    getPlaceholderImageOnError(e);
    setIsError(true);
  };
  const gamePlayerImageUrls = gameData.game.player
    .map((player) => player.profileImage.url)
    .filter((e) => e !== "");

  return (
    <div>
      <AspectRatio ratio={1 / 1} className="mb-2">
        <Image
          src={thumbnail?.url ?? placeholderSrc}
          alt={`thumbnail image ${thumbnail?.id}`}
          className="rounded-md object-cover select-none"
          onError={handleError}
          fill
          sizes="(max-width: 600px) 80vw, 400px"
          style={{ objectFit: "cover" }}
        />
        {(isError || !thumbnail?.url) && (
          <div className="absolute w-full h-full rounded-md border border-red-500 flex justify-center items-center">
            <ImageIcon className="w-10 h-10" color="#aaaaaa" />
            <div className="w-[42px] border-b-2 absolute border-[#aaaaaa] -rotate-45" />
          </div>
        )}
        {gameData.enrichData.me.reachedEndingPlayCount > 0 && (
          <div className="absolute top-2 right-2 z-10">
            <CompleteBadge />
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
              {gamePlayerImageUrls.length > 0 && (
                <PlayerImages gamePlayerImageUrls={gamePlayerImageUrls} />
              )}
              <p className="caption mt-1">
                {totalRechedEndingPlayCount}명이 플레이 했어요
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
