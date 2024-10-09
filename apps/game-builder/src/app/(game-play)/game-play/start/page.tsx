import { Suspense } from "react";
import { notFound } from "next/navigation";
import GameStart from "./_components/GameStart";

export default function Page({
  searchParams,
}: {
  searchParams: { gameId: string };
}) {
  const { gameId } = searchParams;

  if (!gameId) {
    notFound();
  }

  return (
    <Suspense>
      <GameStart gameId={Number(gameId)} />
    </Suspense>
  );
}
