import { type SyntheticEvent, useEffect, useState } from "react";
import Image from "next/image";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@repo/ui/components/ui/Dialog.tsx";
import type { GameIntro, GameListGame } from "@/interface/customType";
import { getGameIntro } from "@/actions/game-play/getIntro";
import { useTranslation } from "@/hooks/useTranslation";
import { AspectRatio } from "@/packages/ui/components/ui/AspectRatio";
import { xIcon } from "@/asset/icons";
import { getPlaceholderImageOnError } from "@/utils/getPlaceholderImageOnError";
import GameContinueButton from "@/app/(game-list)/list/_components/GameContinueButton";
import GameStartButton from "@/app/(game-list)/list/_components/GameStartButton";
import CompleteBadge from "../CompleteBadge";
import PlayerImages from "../game-list-card/PlayerImages";
import GameIntroBadge from "./GameIntroBadge";

export default function GameIntroModal({
  gameData,
  isOpen,
}: {
  gameData: GameListGame;
  isOpen: boolean;
}) {
  const { t } = useTranslation();
  const game = gameData.game;
  const { expectPlayTime, totalEndingCount, totalRechedEndingPlayCount } =
    gameData.enrichData;

  const gameId = game.id;
  const [gameIntroData, setGameIntroData] = useState<GameIntro | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getGameIntroData = async () => {
      setError(null);

      try {
        const response = await getGameIntro(gameId);
        if (response.success) {
          setGameIntroData(response.intro);
        }
      } catch (err) {
        setError("게임 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (gameId && isOpen && !gameIntroData) {
      setLoading(true);
      getGameIntroData();
    }
  }, [isOpen, gameId, gameIntroData]);

  const gamePlayerImageUrls = gameData.game.player
    .map((player) => player.profileImage.url)
    .filter((e) => e !== "");
  const isGamePlaying = gameIntroData?.play !== null;
  const lastPageAbridgement = gameIntroData?.play?.page.abridgement;
  const gameDescription = gameIntroData?.game.description;

  const [hasError, setHasError] = useState(false);
  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    if (hasError) return;
    setHasError(true);
    getPlaceholderImageOnError(e);
  };

  if (!gameData) return null;
  if (error) {
    return (
      <DialogContent>
        <p className="headline">Error 🥲</p>
        <p className="body">게임 정보를 불러오는 중 오류가 발생했습니다.</p>
      </DialogContent>
    );
  }

  return (
    <DialogContent
      className="h-full h-auto w-[calc(100vw-2rem)] max-w-[400px] !rounded-2xl overflow-hidden bg-grey-900 text-white border-none p-4 flex flex-col justify-start"
      hasClose={false}
    >
      <div className="absolute top-0 left-0 w-full">
        <AspectRatio ratio={9 / 9}>
          <Image
            src={gameData.game.thumbnail?.url}
            alt="썸네일 이미지"
            fill
            sizes="(max-width: 600px) 80vw, 400px"
            style={{ objectFit: "cover" }}
            onError={handleImageError}
          />
          <div className="mt-[1px] absolute bg-gradient-to-b from-transparent from-50% to-80% to-grey-900 w-full h-full top-0 left-0" />
        </AspectRatio>
      </div>

      <div className="relative z-1 flex flex-col">
        <DialogHeader className="-m-[1px]">
          <DialogTitle className="flex justify-between">
            <div className="flex gap-1">
              <GameIntroBadge>
                플레이 시간{" "}
                <span className="text-green-500">{expectPlayTime}분</span>
              </GameIntroBadge>
              <GameIntroBadge>
                엔딩 수{" "}
                <span className="text-green-500">{totalEndingCount}개</span>
              </GameIntroBadge>
            </div>

            <DialogTrigger>
              <Image src={xIcon} alt="게임 닫기" />
            </DialogTrigger>
          </DialogTitle>
        </DialogHeader>

        <div className="relative pb-[100%]" />

        <div className="relative flex items-center justify-between h-10 px-[1px] -mt-[6rem]">
          {gameData.enrichData.me.reachedEndingPlayCount && (
            <div className="flex items-center gap-2 absolute -top-8">
              <CompleteBadge className="w-[1.875rem] h-[1.875rem]" />

              <span className="body text-[#42F584]">
                {gameData.enrichData.me.reachedEndingPlayCount}개의 엔딩을
                봤어요
              </span>
            </div>
          )}
          <p className="caption text-grey-100">{t(`genre.${game.genre}`)}</p>{" "}
          <div className="flex items-center gap-1">
            {totalRechedEndingPlayCount !== 0 && (
              <>
                {gamePlayerImageUrls.length > 0 && (
                  <PlayerImages gamePlayerImageUrls={gamePlayerImageUrls} />
                )}
                <p className="caption mt-1">
                  {totalRechedEndingPlayCount}명이 플레이 했어요
                </p>
              </>
            )}
          </div>
        </div>

        <div className="px-[1px]">
          <p className="headline break-keep">{game.title}</p>
          <p className="body text-grey-100 break-keep h-10 line-clamp-2 mb-2">
            {gameDescription}
          </p>
          <p className="caption text-grey-100">
            made by {gameData.publisher.nickname}
          </p>
        </div>

        <DialogFooter className="min-h-[4.5rem]">
          {!loading && gameIntroData && (
            <div className="flex-1 flex flex-col gap-2 mt-6 text-white">
              <div className="flex flex-col h-12">
                <GameStartButton gameId={game.id} isPlaying={isGamePlaying} />
              </div>
              {isGamePlaying && (
                <div>
                  <div className="flex flex-col h-12">
                    <GameContinueButton
                      gameId={game.id}
                      playId={gameIntroData.play.id}
                    />
                  </div>
                  <p className="caption h-4 mt-2 flex text-center text-green-500">
                    {lastPageAbridgement ? (
                      <>
                        <span className="flex-1 line-clamp-1">
                          {lastPageAbridgement}
                        </span>
                        <span>까지 했어요</span>
                      </>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogFooter>
      </div>
    </DialogContent>
  );
}
