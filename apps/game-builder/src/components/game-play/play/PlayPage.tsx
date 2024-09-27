import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import type { GamePlayPage } from "@/interface/customType";
import { getGamePlayPage } from "@/actions/game-play/getGamePlayPage";
import { postGamePlayChoice } from "@/actions/game-play/postGamePlayChoice";
import { getGameResult } from "@/actions/game-play/getGameResult";
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
    const getCurrentPage = async (props: {
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
        if (!response.gamePlayPage.page) {
          return false;
        }

        response.success && setPage(response.gamePlayPage.page);
      } catch (error) {
        throw new Error("게임을 불러오는 중 오류가 발생했습니다.");
      }
      return true;
    };

    const getEndingPage = async (props: { playId: number }) => {
      try {
        const response = await getGameResult(props.playId);
        if (!response.success) {
          throw new Error(response.error.message);
        }
        response.success &&
          setPage({
            id: response.result.endingPage.id,
            description: response.result.endingPage.abridgement,
            tempDescription: "",
            choices: [],
            isEnding: true,
          });
      } catch (error) {
        throw new Error("게임을 불러오는 중 오류가 발생했습니다.");
      }
    };

    async function gamePlay() {
      setLoading(true);
      try {
        const success = getCurrentPage({ gameId, currentPageId });
        !success && getEndingPage({ playId });
      } catch (error) {
        notFound();
      } finally {
        setLoading(false);
      }
    }

    gamePlay();
  }, [currentPageId, gameId]);

  if (loading || (loading && !page)) {
    return null;
  }
  if (!page) {
    return <>페이지가 존재하지 않습니다.</>;
  }

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
        </div>

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
