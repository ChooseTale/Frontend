"use client";
import { useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { postGameContinue } from "@/actions/game-play/postGameStart";
import { type GamePlayParams } from "@/app/(game-play)/game-play/[playId]/page";
import { type GamePlay } from "@/interface/customType";
import PlayPage from "./PlayPage";

export default function GamePlay({ playId }: GamePlayParams) {
  const [gamePlayResponse, setGamePlayResponse] = useState<GamePlay | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");

  useEffect(() => {
    startGame();

    async function startGame() {
      setLoading(true);
      try {
        const response = await postGameContinue(Number(gameId));
        if (!response.success) throw new Error(response.error.message);

        setGamePlayResponse(response.gamePlay);
      } catch (error) {
        notFound();
      } finally {
        setLoading(false);
      }
    }
  }, [gameId]);

  if (loading) {
    return <></>;
  }

  if (!gamePlayResponse || gameId === null) {
    notFound();
  }

  // FIXME: 실제 데이터 받아오면 교체
  // const pageId = gamePlayResponse.page?.id;
  const pageId = 1;

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
