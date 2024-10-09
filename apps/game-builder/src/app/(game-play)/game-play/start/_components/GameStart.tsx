"use client";
import { useEffect, useRef } from "react";
import { notFound, useRouter } from "next/navigation";
import { postGameFirstStart } from "@/actions/game-play/postGameStart";

export default function GameStart({ gameId }: { gameId: number }) {
  const router = useRouter();
  const isReqested = useRef(false);

  useEffect(() => {
    redirect();

    async function redirect() {
      if (isReqested.current) return;
      isReqested.current = true;

      try {
        const response = await postGameFirstStart(gameId);
        if (!response.success) throw new Error(response.error.message);

        const playId = response.gamePlay.playId;
        return router.push(`/game-play/${playId}?gameId=${gameId}`);
      } catch (error) {
        notFound();
      }
    }
  }, [gameId, router]);

  return null;
}
