"use client";
import { useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import {
  postGameContinue,
  postGameFirstStart,
} from "@/actions/game-play/postGameStart";
import { type GamePlay } from "@/interface/customType";
import PlayPage from "./PlayPage";

export default function GameStart({ gameId }: { gameId: number }) {
  const [gamePlayResponse, setGamePlayResponse] = useState<GamePlay | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const playParam = searchParams.get("play");
  const isFirstStart = playParam !== "continue";

  useEffect(() => {
    startGame({ firstStart: isFirstStart });

    async function startGame({ firstStart }: { firstStart: boolean }) {
      setLoading(true);
      try {
        const response = firstStart
          ? await postGameFirstStart(gameId)
          : await postGameContinue(gameId);
        if (!response.success) throw new Error(response.error.message);

        setGamePlayResponse(response.gamePlay);
      } catch (error) {
        notFound();
      } finally {
        setLoading(false);
      }
    }
  }, [gameId, isFirstStart]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!gamePlayResponse) {
    notFound();
  }

  // FIXME: api에서 받은 값으로 변경할 것
  // const pageId = gamePlayResponse.page?.id;
  const pageId = 1;

  return (
    <section className="relative">
      {pageId !== undefined && <PlayPage gameId={gameId} pageId={pageId} />}
    </section>
  );
}
