"use client";
import { Page } from "@choosetale/nestia-type/lib/structures/Page";
import ChoiceCard from "@/components/card/choice/ChoiceCard";
import PageCard from "@components/card/page/PageCard";

interface GameBuilderContentProps {
  gameBuilderData: Page[];
  setGameBuilderData: (gameBuilderData: Page[]) => void;
}

export default function GameBuilderContent({
  gameBuilderData,
  setGameBuilderData,
}: GameBuilderContentProps) {

  return (
    <div className="flex-1 flex flex-col gap-4">
      {gameBuilderData.map((page) => (
        <div key={`page${page.id}`} className="flex flex-col gap-4">
          <PageCard
            abridgement={page.abridgement}
            description={page.description}
          />
          {page.choices.map((choice) => (
            <ChoiceCard
              key={`page${page.id}choice${choice.id}`}
              title={`선택지 ${choice.id}`}
              description={`선택지 내용`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
