"use client";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { type GameIntro as GameIntroType } from "@/interface/customType";
import PlayInfo from "./PlayInfo";
import PlayPage from "./PlayPage";

interface GamePlayProps {
  playId: number;
  gameId: number;
  gameIntro: GameIntroType;
}

export default function GamePlay({ playId, gameId, gameIntro }: GamePlayProps) {
  const router = useRouter();
  const pageId = gameIntro.play?.page?.id;

  if (!pageId) {
    router.push(`/game-play/start?gameId=${gameId}`);
    revalidatePath("/game-play");
  }

  return (
    <section className="relative">
      <PlayInfo gameIntro={gameIntro} />
      <PlayPage gameId={gameId} playId={playId} pageId={pageId} />
    </section>
  );
}
