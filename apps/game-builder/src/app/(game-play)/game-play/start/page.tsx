import { Suspense } from "react";
import BackgroundWapper from "@/components/common/BackgroundWapper";
import GameStart from "@/components/game-play/start/GameStart";

export default function Page() {
  return (
    <BackgroundWapper>
      <Suspense>
        <GameStart />
      </Suspense>
    </BackgroundWapper>
  );
}
