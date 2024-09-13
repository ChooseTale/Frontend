import { Button } from "@/packages/ui/components/ui/Button";
import { useRouter } from "next/navigation";

export default function GameStartButton({ gameId }: { gameId: number }) {
  const router = useRouter();

  const handleRestartClick = () => {
    router.push(`/game/${gameId}/play/?play=first`);
  };

  return (
    <Button className="w-full" variant="outline" onClick={handleRestartClick}>
      게임 시작
    </Button>
  );
}
