import { Button } from "@/packages/ui/components/ui/Button";
import { useRouter } from "next/navigation";

export default function GameRestartButton({ gameId }: { gameId: number }) {
  const router = useRouter();

  const handleRestartClick = () => {
    if (confirm("게임을 처음부터 시작하시겠습니까?")) {
      router.push(`/game/${gameId}/play/?play=first`);
    }
  };

  return (
    <Button className="w-full" variant="outline" onClick={handleRestartClick}>
      새로 하기
    </Button>
  );
}
