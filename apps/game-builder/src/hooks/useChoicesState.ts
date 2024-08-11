import { useState } from "react";
import type { Choice } from "@choosetale/nestia-type/lib/structures/Choice";
import type { Page } from "@choosetale/nestia-type/lib/structures/Page";
import type { ChoiceType } from "@/interface/customType";

interface UseChoicesStateProps {
  gamePageList: Page[];
}

export function useChoicesState({ gamePageList }: UseChoicesStateProps) {
  const [choicesMap, setChoicesMap] = useState<Map<number, Choice[]>>(
    new Map()
  );

  const addChoice = (pageId: number, choice?: ChoiceType): boolean => {
    let success = false;
    setChoicesMap((prevMap) => {
      const actualChoiceLength =
        gamePageList.find((page) => page.id === pageId)?.choices.length ?? 0;
      const choiceLength = prevMap.get(pageId)?.length ?? 0;

      if (actualChoiceLength + choiceLength >= 4) {
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

  const updateChoice = (pageId: number, updatedChoice: Partial<ChoiceType>) => {
    setChoicesMap((prevMap) => {
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

  const removeChoice = (pageId: number, choiceId: number) => {
    setChoicesMap((prevMap) => {
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
    choicesMap,
    setChoicesMap,
    addChoice,
    updateChoice,
    removeChoice,
  };
}
