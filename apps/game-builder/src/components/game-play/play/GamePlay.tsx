"use client";
import { type GameIntro as GameIntroType } from "@/interface/customType";
import PlayInfo from "../info/PlayInfo";
import PlayPage from "./PlayPage";

interface GamePlayProps {
  playId: number;
  gameId: number;
  gameIntro: GameIntroType;
}

export default function GamePlay({ playId, gameId, gameIntro }: GamePlayProps) {
  const pageId = undefined;
  return (
    <section className="relative">
      {pageId !== undefined ? (
        <>
          <PlayInfo gameIntro={gameIntro} />
          <PlayPage gameId={gameId} playId={playId} pageId={pageId} />
        </>
      ) : (
        <>게임 페이지가 존재하지 않습니다</>
      )}
    </section>
  );
}
