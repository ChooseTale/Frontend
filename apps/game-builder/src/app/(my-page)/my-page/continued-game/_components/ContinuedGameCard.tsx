"use client";
import { useRouter } from "next/navigation";
import { type ContinuedGame } from "@/interface/customType";
import { formatDateString } from "@/utils/formatDatestring";
import Button from "@/components/common/button/Button";
import ErrorHandlingImage from "@components/common/image/ImageWithError";

interface ContinuedGameCardProps {
  continuedGame: ContinuedGame;
  className?: string;
}

export default function ContinuedGameCard({
  continuedGame,
  className,
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
    <div
      className={`w-[calc(50%-1.125rem)] shrink-0 flex flex-col ${className}`}
    >
      <div className="relative w-full pb-[100%] rounded-md overflow-hidden bg-grey-200">
        <ErrorHandlingImage
          src={continuedGame.game.thumbnail.url}
          alt={continuedGame.game.title}
        />

        <div className="absolute w-full h-full bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent to-60% flex flex-col justify-end">
          <div className="flex flex-col gap-0.5 px-2 pb-2">
            <p className="text-grey-100 text-caption font-normal">
              {formatDateString(continuedGame.play.createdAt)}
            </p>
            <p className="text-white text-body line-clamp-2">
              {continuedGame.game.title}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex-1 flex items-center">
          <p className="text-body text-green-500 truncate text-ellipsis px-[1px] py-1.5">
            {continuedGame.play.page?.abridgement}
          </p>
        </div>
        <div className="h-10 flex">
          <Button onClick={onClick} buttonText="이어하기" />
        </div>
      </div>
    </div>
  );
}
