import { useState } from "react";
import { Page } from "@choosetale/nestia-type/lib/structures/Page";
import { Choice } from "@choosetale/nestia-type/lib/structures/Choice";
import { getRecommendChoice } from "@/actions/choice/getRecommendChoice";
import { ChoiceType } from "@/interface/customType";

interface UseClientChoicesProps {
  gamePageData: Page[];
}

export default function useClientChoices({
  gamePageData,
}: UseClientChoicesProps) {
  const [clientChoicesMap, setClientChoicesMap] = useState<
    Map<number, Choice[]>
  >(new Map());

  const addClientChoice = (pageId: number, choice?: ChoiceType): boolean => {
    let success: boolean = false;
    setClientChoicesMap((prevMap) => {
      const actualChoiceLength =
        gamePageData.find((page) => page.id === pageId)?.choices.length ?? 0;
      const clientChoiceLength = prevMap.get(pageId)?.length ?? 0;

      if (actualChoiceLength + clientChoiceLength >= 4) {
        success = false;
        return prevMap;
      }

      const existingChoices = prevMap.get(pageId) || [];
      const newChoice: ChoiceType = {
        id: existingChoices.length,
        fromPageId: pageId,
        toPageId: -1,
        createdAt: new Date().toISOString(),
        title: choice?.title ?? "",
        description: choice?.description ?? "",
        source: "client",
      };
      const updatedChoices = [...existingChoices, newChoice];
      const newMap = new Map(prevMap);
      newMap.set(pageId, updatedChoices);

      success = true;
      return newMap;
    });
    return success;
  };
  const addAiChoice = async ({
    gameId,
    pageId,
  }: {
    pageId: number;
    gameId: number;
  }) => {
    const res = await getRecommendChoice(gameId, pageId);
    if (!res.success) return;

    const choice = res.choice;
    const newChoice: ChoiceType = {
      ...choice,
      id:
        (gamePageData.find((page) => page.id === pageId)?.choices.length ?? 0) +
        (clientChoicesMap.get(pageId)?.length ?? 0) +
        1,
      fromPageId: pageId,
      toPageId: -1,
      createdAt: new Date().toISOString(),
    };

    setClientChoicesMap((prevMap) => {
      const existingChoices = prevMap.get(pageId) || [];
      const updatedChoices = [...existingChoices, newChoice];
      const newMap = new Map(prevMap);
      newMap.set(pageId, updatedChoices);
      return newMap;
    });
  };

  const updateClientChoice = (
    pageId: number,
    updatedChoice: Partial<ChoiceType>
  ) => {
    setClientChoicesMap((prevMap) => {
      const existingChoices = prevMap.get(pageId) || [];
      const updatedChoices = existingChoices.map((choice) =>
        choice.id === updatedChoice.id
          ? { ...choice, ...updatedChoice }
          : choice
      );
      const newMap = new Map(prevMap);
      newMap.set(pageId, updatedChoices);
      return newMap;
    });
  };

  const removeClientChoice = (pageId: number, choiceId: number) => {
    setClientChoicesMap((prevMap) => {
      const existingChoices = prevMap.get(pageId) || [];
      const updatedChoices = existingChoices.filter(
        (choice) => choice.id !== choiceId
      );
      const newMap = new Map(prevMap);
      if (updatedChoices.length > 0) {
        newMap.set(pageId, updatedChoices);
      } else {
        newMap.delete(pageId);
      }
      return newMap;
    });
  };

  return {
    clientChoicesMap,
    addAiChoice,
    addClientChoice,
    removeClientChoice,
    updateClientChoice,
  };
}
