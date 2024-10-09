import { useRouter } from "next/navigation";
import { Button } from "@/packages/ui/components/ui/Button";

export default function GameStartButton({
  gameId,
  isPlaying = false,
}: {
  gameId: number;
  isPlaying: boolean;
}) {
  const router = useRouter();

  const handleRestartClick = () => {
    router.push(`/game-play/start?gameId=${gameId}`);
  };

  return (
    <Button
      className={` flex-1 h-full rounded-lg ${isPlaying ? "ct-unable" : "ct-fill"}`}
      onClick={handleRestartClick}
    >
      <span className="text-headline text-white">새로하기</span>
    </Button>
  );
}
