import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@repo/ui/components/ui/Dialog.tsx";
import { type GameListGame } from "@/interface/customType";
import { useTranslation } from "@/hooks/useTranslation";
import { AspectRatio } from "@/packages/ui/components/ui/AspectRatio";
import { xIcon } from "@/asset/icons";
import GameContinueButton from "@/app/(game-list)/_components/GameContinueButton";
import GameStartButton from "@/app/(game-list)/_components/GameStartButton";
import PlayerImages from "../game-list-card/PlayerImages";
import GameIntroBadge from "./GameIntroBadge";

export default function GameIntroModal({
  gameData,
  children,
}: {
  gameData: GameListGame;
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  const game = gameData.game;

  const { expectPlayTime, totalEndingCount, totalRechedEndingPlayCount } =
    gameData.enrichData;

  // const gamePlayer = gameData.game.player.map(
  //   (player) => player.profileImage.url
  // );
  const isGamePlaying = true;
  const lastPageAbridgement = "lastPageAbridgement";

  return (
    <Dialog>
      <DialogTrigger className="text-left">{children}</DialogTrigger>
      <DialogContent
        className="h-full max-h-[600px] w-[calc(100vw-2rem)] max-w-[400px] !rounded-2xl overflow-hidden bg-grey-900 text-white border-none p-4"
        hasClose={false}
      >
        <div className="absolute top-0 w-full">
          <AspectRatio ratio={9 / 9}>
            <Image
              src={gameData.game.thumbnail?.url}
              alt="썸네일 이미지"
              fill
              sizes="(max-width: 600px) 80vw, 400px"
              style={{ objectFit: "cover" }}
            />
            <div className="absolute bg-gradient-to-b from-transparent from-50% to-80% to-grey-900 w-full h-full top-0 left-0" />
          </AspectRatio>
        </div>

        <div className="relative z-1 flex flex-col">
          <DialogHeader className="flex-1 -m-[1px]">
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

          <div className="flex items-center justify-between h-10 px-[1px]">
            <p className="caption text-grey-100">{t(`genre.${game.genre}`)}</p>{" "}
            <div className="flex items-center gap-1">
              {totalRechedEndingPlayCount !== 0 && (
                <>
                  <PlayerImages profileIcons={new Array(3).fill("")} />
                  {/* 
                      TODO: 
                        ProfileIcons 컴포넌트를 사용하려면 진짜 gamePlayer 필요
                        (더미 텍스트가 Next Image에 들어가면서 오류 발생)
                      <ProfileIcons profileIcons={gamePlayer} /> 
                    */}
                  <p className="caption mt-1">
                    {totalRechedEndingPlayCount}명이 엔딩을 봤어요
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="px-[1px]">
            <p className="headline my-1 break-keep">{game.title}</p>
            <p className="body text-grey-100 break-keep h-10">게임의 설명</p>
            <p className="caption text-grey-100">
              made by {gameData.publisher.nickname}
            </p>
          </div>

          <DialogFooter>
            <div className="flex-1 flex flex-col gap-2 mt-6 text-white">
              <div className="flex flex-col h-12">
                <GameStartButton gameId={game.id} isPlaying={isGamePlaying} />
              </div>
              {isGamePlaying && (
                <div>
                  <div className="flex flex-col h-12">
                    <GameContinueButton gameId={game.id} playId={0} />
                  </div>
                  <p className="caption text-green-500 mt-2 text-center">
                    {lastPageAbridgement} 까지 했어요
                  </p>
                </div>
              )}
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
