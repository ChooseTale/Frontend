import { useRef, useState } from "react";
import { notFound } from "next/navigation";
import type { GamePlayPage } from "@/interface/customType";
import { getGamePlayPage } from "@/actions/game-play/getGamePlayPage";
import { postGamePlayChoice } from "@/actions/game-play/postGamePlayChoice";
import { getGameResult } from "@/actions/game-play/getGameResult";

interface UseGamePlayProps {
  pageId: number;
  playId: number;
}

export default function useGamePlay({ pageId, playId }: UseGamePlayProps) {
  const [currentPageId, setCurrentPageId] = useState(pageId);
  const [page, setPage] = useState<GamePlayPage["page"] | null>(null);
  const [choiceSending, setChoiceSending] = useState(false);
  const playIdRef = useRef(playId);
  const isEnding = page?.isEnding;

  const getCurrentPage = async (props: {
    gameId: number;
    currentPageId: number;
  }) => {
    try {
      const response = await getGamePlayPage(props.gameId, props.currentPageId);

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
          description:
            response.result.endingPage.description ??
            response.result.endingPage.abridgement,
          tempDescription: "",
          choices: [],
          isEnding: true,
        });
    } catch (error) {
      throw new Error("게임을 불러오는 중 오류가 발생했습니다.");
    }
  };

  const selectChoice = async ({ choiceId }: { choiceId: number }) => {
    if (choiceSending) return;
    setChoiceSending(true);
    try {
      const response = await postGamePlayChoice(playIdRef.current, choiceId);
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

  return {
    page,
    currentPageId,
    choiceSending,
    isEnding,
    getCurrentPage,
    getEndingPage,
    selectChoice,
  };
}
