"use client";
import useClientChoices from "@/hooks/useClientChoices";
import type useGameData from "@/hooks/useGameData";
import ChoiceCard from "@/components/card/choice/ChoiceCard";
import PageCard from "@components/card/page/PageCard";
import type { ChoiceType } from "@/interface/customType";

interface GameBuilderContentProps extends ReturnType<typeof useGameData> {
  gameId: number;
}

export default function GameBuilderContent({
  gameId,
  ...useGameDataProps
}: GameBuilderContentProps) {
  const {
    gamePageList,
    deleteChoice,
    addPage,
    updatePage,
    deletePage,
    updateChoices,
  } = useGameDataProps;
  const {
    clientChoicesMap,
    addClientChoice,
    removeClientChoice,
    addAiChoice,
    updateClientChoice,
  } = useClientChoices({
    gamePageList,
  });

  const handleAddPageAndChoice = (pageId: number, depth: number) => {
    // console.log(`POST /game/${gameId}/page 카드 추가`);
    // console.log("(hidden) 페이지 데이터 추가");
    // console.log("선택지 카드 UI 추가");
    const success = addClientChoice(pageId);
    success && addPage({ depth });
  };
  const handleAddPageAndChoiceByAI = async (pageId: number) => {
    // console.log(`POST /game/${gameId}/page 카드 추가`);
    // console.log("(hidden) 페이지 데이터 추가");
    // console.log(`GET /game/${gameId}/page/${pageId}/recommend-choices`);
    // console.log("선택지 카드 추가 🤖");
    const response = addAiChoice({ gameId, pageId });
    return response;
  };
  const handleFixChoice = (pageId: number, choice: ChoiceType) => {
    if (choice.source === "server") updateChoices(pageId, choice);
    if (choice.source === "client") updateClientChoice(pageId, choice);
  };
  const handleDeleteChoice = (pageId: number, choice: ChoiceType) => {
    if (choice.source === "server") {
      removeClientChoice(pageId, choice.id);
      deletePage(pageId);
    }
    if (choice.source === "server") deleteChoice(pageId, choice.id);
  };

  const availablePages = gamePageList.map((page) => ({
    pageId: page.id,
    title: page.abridgement,
  }));
  const getToPage = (toPageId: number) =>
    availablePages.find((p) => p.pageId === toPageId);

  return (
    <div className="flex-1 flex flex-col gap-4">
      {gamePageList.map((page) => {
        const choices = page.choices as ChoiceType[];
        const clientChoice = clientChoicesMap.get(page.id) as
          | ChoiceType[]
          | undefined;

        return (
          <div key={`page${page.id}`} className="flex flex-col gap-4">
            <PageCard
              page={page}
              choicesLength={page.choices.length + (clientChoice?.length ?? 0)}
              addChoice={() => handleAddPageAndChoice(page.id, page.depth + 1)}
              addAIChoice={() => handleAddPageAndChoiceByAI(page.id)}
              updatePage={updatePage}
            />
            {[...choices, ...(clientChoice ? clientChoice : [])].map(
              (choice) => {
                return (
                  <ChoiceCard
                    key={`page${page.id}choice${choice.id}`}
                    choice={choice}
                    defaultFixed={choice.source === "server"}
                    fixChoice={(partialChoice) =>
                      handleFixChoice(page.id, partialChoice)
                    }
                    removeChoice={() => handleDeleteChoice(page.id, choice)}
                    availablePages={availablePages}
                    linkedPage={getToPage(choice.toPageId)}
                  />
                );
              }
            )}
          </div>
        );
      })}
    </div>
  );
}
