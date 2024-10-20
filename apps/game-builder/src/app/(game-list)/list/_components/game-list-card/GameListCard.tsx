import { AspectRatio } from "@/packages/ui/components/ui/AspectRatio";
import { type GameListGame } from "@/interface/customType";
import { useTranslation } from "@/hooks/useTranslation";
import ErrorHandlingImage from "@/components/common/image/ImageWithError";
import CompleteBadge from "../CompleteBadge";
import PlayerImages from "./PlayerImages";

export default function GameListCard({ gameData }: { gameData: GameListGame }) {
  const { t } = useTranslation();

  const game = gameData.game;
  if (!game) return null;

  const { thumbnail, title, genre } = game;
  const totalRechedEndingPlayCount =
    gameData.enrichData.totalRechedEndingPlayCount;

  const gamePlayerImageUrls = gameData.game.player
    .map((player) => player.profileImage.url)
    .filter((e) => e !== "");

  return (
    <div>
      <AspectRatio ratio={1 / 1} className="mb-2">
        <ErrorHandlingImage
          src={thumbnail?.url}
          alt="썸네일 이미지"
          sizes="(max-width: 600px) 80vw, 400px"
          hasErrorDisplay
        />
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
