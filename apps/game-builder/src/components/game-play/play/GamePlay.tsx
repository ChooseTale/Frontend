"use client";
import { useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { type GamePlayParams } from "@/app/(game-play)/game-play/[playId]/page";
import { type GameIntro as GameIntroType } from "@/interface/customType";
import PlayPage from "./PlayPage";
import { getGameIntro } from "@/actions/game-play/getIntro";

export default function GameIntro({ playId }: GamePlayParams) {
  const [gameIntroResponse, setGameIntroResponse] =
    useState<GameIntroType | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");

  useEffect(() => {
    startGame();

    async function startGame() {
      setLoading(true);
      try {
        const response = await getGameIntro(Number(gameId));
        if (!response.success) throw new Error(response.error.message);

        setGameIntroResponse(response.intro);
      } catch (error) {
        notFound();
      } finally {
        setLoading(false);
      }
    }
  }, [gameId]);

  if (loading) {
    return null;
  }

  if (!gameIntroResponse || gameId === null) {
    notFound();
  }

  const pageId = gameIntroResponse.play?.page.id;
  return (
    <section className="relative">
      {pageId !== undefined ? (
        <PlayPage
          gameId={Number(gameId)}
          playId={Number(playId)}
          pageId={pageId}
        />
      ) : (
        <>게임 페이지가 존재하지 않습니다</>
      )}
    </section>
  );
}
