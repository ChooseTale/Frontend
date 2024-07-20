"use client";
import { Choice } from "@choosetale/nestia-type/lib/structures/Choice";
import useClientChoices from "@/hooks/useClientChoices";
import useGameData from "@/hooks/useGameData";
import ChoiceCard from "@/components/card/choice/ChoiceCard";
import PageCard from "@components/card/page/PageCard";

interface GameBuilderContentProps extends ReturnType<typeof useGameData> {
  gameId: number;
}

export interface TempChoiceType extends Choice {
  title: string;
  description: string;
}

export default function GameBuilderContent({
  gameId,
  ...useGameDataProps
}: GameBuilderContentProps) {
  const { gamePageData, deleteChoice, addPage, deletePage } = useGameDataProps;
  const { clientChoicesMap, addClientChoice, removeClientChoice } =
    useClientChoices({
      gameData: gamePageData,
    });

  const handleAddPageAndChoice = (pageId: number, depth: number) => {
    console.log(`POST /game/${gameId}/page 카드 추가`);
    console.log("(hidden) 페이지 데이터 추가");
    console.log("선택지 카드 UI 추가");
    const success = addClientChoice(pageId);
    success && addPage({ depth });
  };
  const handleAddPageAndChoiceByAI = (pageId: number) => {
    console.log(`POST /game/${gameId}/page 카드 추가`);
    console.log("(hidden) 페이지 데이터 추가");
    console.log(`GET /game/${gameId}/page/${pageId}/recommend-choices`);
    console.log("선택지 카드 추가 🤖");
  };
  const handleCommitChoice = (pageId: number, choice: TempChoiceType) => {
    console.log("선택 결정");
    // updateChoices(pageId, choice);
  };
  const handleRemoveChoiceOnClient = (pageId: number, choiceId: number) => {
    console.log("선택 삭제");
    removeClientChoice(pageId, choiceId);
    deletePage(pageId);
  };
  const handleRemoveChoiceOnData = (pageId: number, choiceId: number) => {
    console.log("선택 삭제");
    deleteChoice(pageId, choiceId);
  };

  return (
    <div className="flex-1 flex flex-col gap-4">
      {gamePageData.map((page) => {
        const clientChoice = clientChoicesMap.get(page.id);

        return (
          <div key={`page${page.id}`} className="flex flex-col gap-4">
            <PageCard
              page={page}
              addChoice={() => handleAddPageAndChoice(page.id, page.depth + 1)}
              addAIChoice={() => handleAddPageAndChoiceByAI(page.id)}
              choicesLength={page.choices.length + (clientChoice?.length ?? 0)}
            />
            {page.choices.map((choice) => (
              <ChoiceCard
                key={`page${page.id}choice${choice.id}`}
                choice={choice}
                defaultCommitted={
                  choice.fromPageId !== undefined &&
                  choice.toPageId !== undefined
                }
                commitChoice={(choice) => handleCommitChoice(page.id, choice)}
                removeChoice={() =>
                  handleRemoveChoiceOnData(page.id, choice.id)
                }
              />
            ))}
            {clientChoice?.map((choice, idx) => (
              <ChoiceCard
                key={`page${page.id}clientChoice${idx}`}
                choice={choice}
                defaultCommitted={false}
                commitChoice={(choice) => handleCommitChoice(page.id, choice)}
                removeChoice={() =>
                  handleRemoveChoiceOnClient(page.id, choice.id)
                }
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
