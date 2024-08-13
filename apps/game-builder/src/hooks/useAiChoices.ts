import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { SOCKET_URL } from "@/config/config";
import type { ChoiceType, MaxChoiceLengthEnum } from "@/interface/customType";
import { getRecommendChoice } from "@/actions/choice/getRecommendChoice";
import type { useUnFixedChoices } from "./useChoicesState";

interface UseAiChoicesStateProps {
  setUnFixedChoicesMap: ReturnType<
    typeof useUnFixedChoices
  >["setUnFixedChoicesMap"];
  unFixedChoicesLength: number;
  maxChoiceLength: MaxChoiceLengthEnum;
}

export function useAiChoice({
  setUnFixedChoicesMap,
  unFixedChoicesLength,
  maxChoiceLength,
}: UseAiChoicesStateProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const currentRequest = useRef<{
    gameId: number;
    pageId: number;
  } | null>(null);

  const genAiChoice = async ({
    gameId,
    pageId,
  }: {
    pageId: number;
    gameId: number;
  }) => {
    setIsGenerating(true);
    const res = await getRecommendChoice(gameId, pageId);
    if (!res.success || socketRef.current) return;

    const socket = io(`${SOCKET_URL}/chat-gpt`);

    socket.on("connect", () => {
      socket.on("recommend-choices", handleRecommendChoices);
    });

    socketRef.current = socket;
    currentRequest.current = { gameId, pageId };
  };

  const handleRecommendChoices = useCallback(
    (data: ChoiceType[]) => {
      // FIXME: 소켓 메시지 업데이트 예정
      // state: "success" | "error" 체크 필요
      const choices = data;
      if (!currentRequest.current) return;
      const { pageId } = currentRequest.current;

      setUnFixedChoicesMap((prevMap) => {
        const existingChoices = prevMap.get(pageId) || [];
        const minIndex = existingChoices.reduce(
          (min, choice) => Math.min(min, choice.id),
          0
        );

        const newChoices: ChoiceType[] = choices.map((choice, index) => ({
          ...choice,
          id: minIndex - (index + 1),
          fromPageId: pageId,
          toPageId: -1,
          createdAt: new Date().toISOString(),
          source: "client",
        }));

        const combinedChoices = [...existingChoices, ...newChoices];
        const limitedChoices = combinedChoices.slice(
          0,
          maxChoiceLength - unFixedChoicesLength
        );

        const newMap = new Map(prevMap);
        newMap.set(pageId, limitedChoices);

        socketRef.current?.disconnect();
        socketRef.current = null;
        currentRequest.current = null;
        setIsGenerating(false);

        return newMap;
      });
    },
    [setUnFixedChoicesMap, maxChoiceLength, unFixedChoicesLength]
  );

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.off("recommend-choices", handleRecommendChoices);
        socketRef.current.disconnect();
      }
    };
  }, [handleRecommendChoices]);

  return {
    genAiChoice,
    isGenerating,
  };
}
