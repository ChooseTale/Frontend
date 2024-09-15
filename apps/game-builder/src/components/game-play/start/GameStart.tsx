"use client";
import { useEffect } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { postGameFirstStart } from "@/actions/game-play/postGameStart";

export default function GameStart() {
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");
  const router = useRouter();

  if (!gameId) {
    notFound();
  }

  useEffect(() => {
    redirect();

    async function redirect() {
      try {
        const response = await postGameFirstStart(Number(gameId));
        if (!response.success) throw new Error(response.error.message);

        const playId = response.gamePlay.playId;
        router.push(`/game-play/${playId}?gameId=${gameId}`);
      } catch (error) {
        notFound();
      } finally {
      }
    }
  }, [gameId]);

  return null;
}
