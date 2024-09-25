import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import type { GamePlayPage } from "@/interface/customType";
import { getGamePlayPage } from "@/actions/game-play/getGamePlayPage";
import { postGamePlayChoice } from "@/actions/game-play/postGamePlayChoice";
import TypingHtml from "@/components/common/text/TypingHtml";
import PlayChoices from "./PlayChoices";
import EndingPageButtonBox from "./EndingPageButtonBox";

export default function PlayPage({
  gameId,
  playId,
  pageId,
}: {
  gameId: number;
  playId: number;
  pageId: number;
}) {
  const [currentPageId, setCurrentPageId] = useState(pageId);
  const [gamePlayResponse, setGamePlayResponse] = useState<GamePlayPage | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [choiceSending, setChoiceSending] = useState(false);
  const isEnding = gamePlayResponse?.page?.isEnding;

  useEffect(() => {
    async function startGame() {
      setLoading(true);
      try {
        const response = await getGamePlayPage(gameId, currentPageId);

        response.success && setGamePlayResponse(response.gamePlayPage);
      } catch (error) {
        return notFound();
      } finally {
        setLoading(false);
      }
    }

    startGame();
  }, [playId, currentPageId, gameId]);

  if (loading) {
    return null;
  }

  if (!gamePlayResponse) notFound();
  const page = gamePlayResponse?.page;
  if (!page) notFound();

  const handleChoiceClick = async (choiceId: number) => {
    if (choiceSending) return;
    setChoiceSending(true);
    try {
      const response = await postGamePlayChoice(playId, choiceId);
      if (!response.success) {
        throw new Error(response.error.message);
      }
      const nextPageId = response.gamePlay.page?.id;
      nextPageId && setCurrentPageId(nextPageId);
    } catch (error) {
      return notFound();
    } finally {
      setChoiceSending(false);
    }
  };

  return (
    <>
      <div className="pt-6 pb-8 min-h-24">
        {isEnding ? (
          <h1 className="text-2xl font-bold text-center mb-8">이야기의 끝</h1>
        ) : (
          ""
        )}
        <TypingHtml htmlContent={page.description} speed="fast" />
      </div>

      {!isEnding && (
        <PlayChoices
          choiceSending={choiceSending}
          choices={page.choices}
          handleChoiceClick={handleChoiceClick}
          pageLength={page.description.length}
        />
      )}

      {isEnding ? <EndingPageButtonBox gameId={gameId} playId={playId} /> : ""}
    </>
  );
}
