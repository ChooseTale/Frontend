import { useRouter } from "next/navigation";
import Button from "@/components/common/button/Button";

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
      onClick={handleRestartClick}
      isPlaying={isPlaying}
      unable={false}
      buttonText="새로하기"
    />
  );
}
