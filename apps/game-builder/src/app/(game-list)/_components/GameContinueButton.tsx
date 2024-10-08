import Link from "next/link";

export default function GameContinueButton({
  gameId,
  playId,
  className,
}: {
  gameId: number;
  playId: number;
  className?: string;
}) {
  return (
    <Link
      href={`/game-play/${playId}?gameId=${gameId}`}
      className={`ct-fill flex-1 h-full rounded-lg ${className} content-center`}
    >
      <span className="text-headline text-white">이어하기</span>
    </Link>
  );
}
