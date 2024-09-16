import Link from "next/link";
import { Button } from "@/packages/ui/components/ui/Button";

export default function GameResultButton({ playId }: { playId: number }) {
  return (
    <Link href={`/game-play/${playId}/result`} className="w-full">
      <Button
        className="w-full h-auto border border-b-2 border-black gap-2 text-lg"
        variant="ghost"
      >
        결과 확인
      </Button>
    </Link>
  );
}
