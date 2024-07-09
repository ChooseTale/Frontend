"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Page } from "@choosetale/nestia-type/lib/structures/Page";
import StoryLine from "./StoryLine";
import GameSubmitButton from "@/components/button/GameSubmitButton";
import GameBuilderContent from "./GameBuilderContent";

export default function GameBuilder() {
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/game/confirm");
  };

  const [gameBuilderData, setGameBuilderData] = useState<Page[]>([
    {
      id: 0,
      abridgement: "페이지 요약",
      description: "페이지 내용",
      createdAt: "datetime",
      depth: 0,
      choices: [
        {
          id: 0,
          fromPageId: 0,
          toPageId: 1,
          createdAt: "datetime",
        },
        {
          id: 1,
          fromPageId: 0,
          toPageId: 1,
          createdAt: "datetime",
        },
      ],
    },
    {
      id: 1,
      abridgement: "페이지 요약",
      description: "페이지 내용",
      createdAt: "datetime",
      depth: 0,
      choices: [],
    },
  ]);

  return (
    <form onSubmit={onSubmit} className="relative flex h-full px-6 pt-4">
      <StoryLine />
      <GameSubmitButton theme="" />

      <div className="flex-1 flex flex-col gap-4">
        <GameBuilderContent
          gameBuilderData={gameBuilderData}
          setGameBuilderData={setGameBuilderData}
        />
      </div>
    </form>
  );
}
