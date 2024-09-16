import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import type { GamePlayPage } from "@/interface/customType";
import { getGamePlayPage } from "@/actions/game-play/getGamePlayPage";
import { postGamePlayChoice } from "@/actions/game-play/postGamePlayChoice";
import TypingHtml from "@/components/common/text/TypingHtml";
import PlayChoices from "./PlayChoices";

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

  useEffect(() => {
    async function startGame() {
      setLoading(true);
      try {
        const response = await getGamePlayPage(playId, currentPageId);

        response.success && setGamePlayResponse(response.gamePlayPage);
      } catch (error) {
        return notFound();
      } finally {
        setLoading(false);
      }
    }

    startGame();
  }, [playId, currentPageId]);

  if (loading) {
    return null;
  }

  if (!gamePlayResponse) notFound();
  const page = gamePlayResponse?.page[0];

  const handleChoiceClick = async (choiceId: number) => {
    if (choiceSending) return;
    setChoiceSending(true);
    try {
      const response = await postGamePlayChoice(gameId, choiceId);
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
        <TypingHtml htmlContent={page.description} speed="fast" />
      </div>

      <PlayChoices
        choiceSending={choiceSending}
        choices={page.choices}
        handleChoiceClick={handleChoiceClick}
        pageLength={page.description.length}
      />
    </>
  );
}
