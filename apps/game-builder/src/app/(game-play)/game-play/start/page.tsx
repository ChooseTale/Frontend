import { Suspense } from "react";
import GameStart from "@/components/game-play/start/GameStart";

export default function Page() {
  return (
    <Suspense>
      <GameStart />
    </Suspense>
  );
}
