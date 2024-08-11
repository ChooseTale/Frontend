import { useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { getRecommendChoice } from "@/actions/choice/getRecommendChoice";
import type { ChoiceType } from "@/interface/customType";
import { useChoicesState } from "./useChoicesState";

interface UseAiChoicesStateProps {
  setChoicesMap: ReturnType<typeof useChoicesState>["setChoicesMap"];
}

export function useAiChoice({
  setChoicesMap: setClientChoicesMap,
}: UseAiChoicesStateProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const currentRequest = useRef<{
    gameId: number;
    pageId: number;
  } | null>(null);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        console.log("bye");
        socketRef.current.off("recommend-choices", handleRecommendChoices);
        socketRef.current.disconnect();
      }
    };
  }, []);

  const addAiChoice = async ({
    gameId,
    pageId,
  }: {
    pageId: number;
    gameId: number;
  }) => {
    setIsGenerating(true);
    const res = await getRecommendChoice(gameId, pageId);
    if (!res.success || socketRef.current) return;

    const socket = io("http://localhost:5002/chat-gpt");

    socket.on("connect", () => {
      socket.on("recommend-choices", handleRecommendChoices);
    });

    socketRef.current = socket;
    currentRequest.current = { gameId, pageId };
  };

  const handleRecommendChoices = (data: any) => {
    const choices = data as ChoiceType[];
    if (!currentRequest.current) return;
    const { pageId } = currentRequest.current;

    setClientChoicesMap((prevMap) => {
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
      const limitedChoices = combinedChoices.slice(0, 4);

      const newMap = new Map(prevMap);
      newMap.set(pageId, limitedChoices);

      socketRef.current?.disconnect();
      socketRef.current = null;
      currentRequest.current = null;
      setIsGenerating(false);

      return newMap;
    });
  };

  return {
    addAiChoice,
    isGenerating,
  };
}
