"use client";
import { Suspense } from "react";
import Game from "@/app/(game-list)/game-list/_components/Game";
import TextOverlayDiv from "@/components/common/TextOverlayDiv";
import useGameList from "../_hooks/useGameList";

function GameListContent() {
  const { observerRef, gameList, loading, error, hasMore, page } =
    useGameList();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-6">
        {gameList?.map((e) => <Game gameData={e} key={Math.random()} />)}
        {!loading && !hasMore && !gameList?.length && (
          <TextOverlayDiv text="게임이 없습니다." />
        )}
      </div>
      {loading && page > 2 && <p className="text-center">Loading...</p>}
      <div ref={observerRef} style={{ height: "1px" }} />
    </div>
  );
}

export default function GameList() {
  return (
    <Suspense fallback={null}>
      <GameListContent />
    </Suspense>
  );
}
