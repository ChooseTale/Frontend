import Link from "next/link";
import Button from "@/components/common/button/Button";

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
      className={`h-full flex ${className}`}
    >
      <Button onClick={() => null} buttonText="이어하기" />
    </Link>
  );
}
