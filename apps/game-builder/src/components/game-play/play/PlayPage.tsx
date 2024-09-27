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
  const [page, setPage] = useState<GamePlayPage["page"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [choiceSending, setChoiceSending] = useState(false);

  useEffect(() => {
    const getCurrentGame = async (props: {
      gameId: number;
      currentPageId: number;
    }) => {
      try {
        const response = await getGamePlayPage(
          props.gameId,
          props.currentPageId
        );
        if (!response.success) {
          throw new Error(response.error.message);
        }
        response.success && setPage(response.gamePlayPage.page);
      } catch (error) {
        throw new Error("게임을 불러오는 중 오류가 발생했습니다.");
      }
    };

    function startGame() {
      setLoading(true);
      try {
        getCurrentGame({ gameId, currentPageId });
      } catch (error) {
        notFound();
      } finally {
        setLoading(false);
      }
    }

    startGame();
  }, [currentPageId, gameId]);

  if (loading || !page) {
    return null;
  }
  if (!loading && !page) notFound();

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

  const isEnding = page.isEnding;

  if (isEnding) {
    return (
      <>
        <div className="pt-6 pb-8 min-h-24">
          <h1 className="text-2xl font-bold text-center mb-8">이야기의 끝</h1>
          <TypingHtml htmlContent={page.description} speed="fast" />
        </div>{" "}
        <EndingPageButtonBox gameId={gameId} playId={playId} />
      </>
    );
  }

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
