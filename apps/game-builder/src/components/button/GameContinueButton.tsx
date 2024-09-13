import { Button } from "@/packages/ui/components/ui/Button";
import Link from "next/link";

export default function GameContinueButton({
  gameId,
  playId,
}: {
  gameId: number;
  playId: number;
}) {
  return (
    <Link
      href={`game/${gameId}/play/${playId}?play=continue`}
      className="w-full"
    >
      <Button className="w-full">이어하기</Button>
    </Link>
  );
}
