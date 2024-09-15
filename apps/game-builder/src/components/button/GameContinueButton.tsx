import Link from "next/link";
import { Button } from "@/packages/ui/components/ui/Button";

export default function GameContinueButton({
  gameId,
  playId,
  lastPageAbridgement,
}: {
  gameId: number;
  playId: number;
  lastPageAbridgement: string;
}) {
  return (
    <Link href={`/game-play/${playId}?gameId=${gameId}`} className="w-full">
      <Button className="w-full">
        이어하기{" "}
        <span className="overflow-hidden whitespace-nowrap overflow-ellipsis">
          {lastPageAbridgement ? `: ${lastPageAbridgement}` : ""}
        </span>
      </Button>
    </Link>
  );
}
