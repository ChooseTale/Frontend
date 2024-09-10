import { checkSpelling } from "@/actions/page/checkSpelling";

interface UseSpellCheckProps {
  gameId: number;
}

export default function useSpellCheck({ gameId }: UseSpellCheckProps) {
  const spellCheck = async (text = "왜안되") => {
    const spells = await checkSpelling(gameId, text);
    if (spells.success && spells.text.includes("<color>")) {
      return { correct: false, text: spells.text };
    }
    return { correct: true, text };
  };

  return { spellCheck };
}
