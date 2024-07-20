import { useState } from "react";
import { Page } from "@choosetale/nestia-type/lib/structures/Page";
import { Choice } from "@choosetale/nestia-type/lib/structures/Choice";

interface UseClientChoicesProps {
  gameData: Page[];
}

export default function useClientChoices({ gameData }: UseClientChoicesProps) {
  const [clientChoicesMap, setClientChoicesMap] = useState<
    Map<number, Choice[]>
  >(new Map());

  const addClientChoice = (pageId: number): boolean => {
    let success: boolean = false;
    setClientChoicesMap((prevMap) => {
      const actualChoiceLength =
        gameData.find((page) => page.id === pageId)?.choices.length ?? 0;
      const clientChoiceLength = prevMap.get(pageId)?.length ?? 0;

      if (actualChoiceLength + clientChoiceLength >= 4) {
        success = false;
        return prevMap;
      }

      const existingChoices = prevMap.get(pageId) || [];
      const newChoice: Choice = {
        id: existingChoices.length,
        fromPageId: pageId,
        toPageId: -1,
        createdAt: new Date().toISOString(),
      };
      const updatedChoices = [...existingChoices, newChoice];
      const newMap = new Map(prevMap);
      newMap.set(pageId, updatedChoices);

      success = true;
      return newMap;
    });
    return success;
  };

  const submitClientChoice = () => {};

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
    addClientChoice,
    removeClientChoice,
    submitClientChoice,
  };
}
