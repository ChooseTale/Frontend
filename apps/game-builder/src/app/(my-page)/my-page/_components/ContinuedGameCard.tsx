"use client";
import { useRouter } from "next/navigation";
import { type ContinuedGame } from "@/interface/customType";
import Button from "@/components/common/button/Button";

interface ContinuedGameCardProps {
  continuedGame: ContinuedGame;
}

export default function ContinuedGameCard({
  continuedGame,
}: ContinuedGameCardProps) {
  const router = useRouter();
  const onClick = () => {
    if (continuedGame.play.id) {
      router.push(
        `/game-play/${continuedGame.play.id}?gameId=${continuedGame.game.id}`
      );
    }
  };

  return (
    <div className="w-[calc(50%-1.125rem)] h-[15rem] shrink-0 flex flex-col">
      <div className="relative w-full h-[10rem] rounded-md overflow-hidden bg-grey-200">
        {/* <ErrorHandlingImage
            src={continuedGame.game.thumbnail.url}
            alt="thumbnail"
          /> */}
        <div className="absolute w-full h-full bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent to-60% flex flex-col justify-end">
          <div className="flex flex-col gap-0.5 px-2 pb-2">
            <p className="text-grey-100 text-caption text-thin">
              {new Date(continuedGame.play.createdAt)
                .toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\. /g, ".")
                .replace(".", "")}
            </p>
            <p className="text-white text-body line-clamp-2">
              {continuedGame.game.title}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex-1 flex items-center">
          <p className="text-body text-green-500 truncate text-ellipsis px-[1px]">
            {continuedGame.play.page?.abridgement}
          </p>
        </div>
        <div className="h-12 flex">
          <Button onClick={onClick} buttonText="이어하기" />
        </div>
      </div>
    </div>
  );
}
