import { useState } from "react";
import type { Choice } from "@choosetale/nestia-type/lib/structures/Choice";
import type { Page } from "@choosetale/nestia-type/lib/structures/Page";
import type { ChoiceType, MaxChoiceLengthEnum } from "@/interface/customType";

interface UseChoicesProps {
  gamePageList: Page[];
  maxChoiceLength: MaxChoiceLengthEnum;
}

export function useUnFixedChoices({
  gamePageList,
  maxChoiceLength,
}: UseChoicesProps) {
  const [unFixedChoicesMap, setUnFixedChoicesMap] = useState<
    Map<number, Choice[]>
  >(new Map());

  const addChoice = (pageId: number, choice?: ChoiceType): boolean => {
    let success = false;
    setUnFixedChoicesMap((prevMap) => {
      const fixedChoiceLength =
        gamePageList.find((page) => page.id === pageId)?.choices.length ?? 0;
      const unFixedChoices = prevMap.get(pageId) || [];

      if (
        fixedChoiceLength + unFixedChoices.length >=
        Number(maxChoiceLength)
      ) {
        success = false;
        return prevMap;
      }

      const newChoice: ChoiceType = {
        id: unFixedChoices.length,
        fromPageId: pageId,
        toPageId: -1,
        createdAt: new Date().toISOString(),
        title: choice?.title ?? "",
        description: choice?.description ?? "",
        source: "client",
      };
      const updatedUnFixedChoices = [...unFixedChoices, newChoice];
      const newMap = new Map(prevMap);
      newMap.set(pageId, updatedUnFixedChoices);

      success = true;
      return newMap;
    });
    return success;
  };

  const updateChoice = (pageId: number, updatedChoice: Partial<ChoiceType>) => {
    setUnFixedChoicesMap((prevMap) => {
      const unFixedChoices = prevMap.get(pageId) || [];
      const updatedChoices = unFixedChoices.map((choice) =>
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
    setUnFixedChoicesMap((prevMap) => {
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
    unFixedChoicesMap,
    setUnFixedChoicesMap,
    addChoice,
    updateChoice,
    removeChoice,
  };
}
