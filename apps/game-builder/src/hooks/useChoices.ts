import type { Page } from "@choosetale/nestia-type/lib/structures/Page";
import { useUnFixedChoices } from "./useChoicesState";
import { useAiChoice } from "./useAiChoices";

interface UseClientChoicesProps {
  gamePageList: Page[];
}

export default function useChoices({ gamePageList }: UseClientChoicesProps) {
  const maxChoiceLength = 4;

  const {
    unFixedChoicesMap,
    setUnFixedChoicesMap,
    addChoice,
    updateChoice,
    removeChoice,
  } = useUnFixedChoices({ gamePageList, maxChoiceLength });
  const { genAiChoice, isGenerating } = useAiChoice({
    setUnFixedChoicesMap,
    unFixedChoicesLength: unFixedChoicesMap.size,
    maxChoiceLength,
  });

  return {
    unFixedChoicesMap,
    addChoice,
    updateChoice,
    removeChoice,
    genAiChoice,
    isGenerating,
  };
}
