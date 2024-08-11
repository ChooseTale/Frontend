import type { Page } from "@choosetale/nestia-type/lib/structures/Page";
import { useChoicesState } from "./useChoicesState";
import { useAiChoice } from "./useAiChoices";

interface UseClientChoicesProps {
  gamePageList: Page[];
}

export default function useChoices({ gamePageList }: UseClientChoicesProps) {
  const { choicesMap, setChoicesMap, addChoice, updateChoice, removeChoice } =
    useChoicesState({ gamePageList });
  const { addAiChoice, isGenerating } = useAiChoice({
    setChoicesMap,
  });

  return {
    choicesMap,
    addChoice,
    addAiChoice,
    updateChoice,
    removeChoice,
    isGenerating,
  };
}
