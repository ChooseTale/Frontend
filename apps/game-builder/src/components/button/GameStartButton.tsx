import { useRouter } from "next/navigation";
import { Button } from "@/packages/ui/components/ui/Button";

export default function GameStartButton({ gameId }: { gameId: number }) {
  const router = useRouter();

  const handleRestartClick = () => {
    router.push(`/game-play/start?gameId=${gameId}`);
  };

  return (
    <Button className="w-full" variant="outline" onClick={handleRestartClick}>
      게임 시작
    </Button>
  );
}
