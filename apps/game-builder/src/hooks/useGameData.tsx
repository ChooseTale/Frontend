"use client";
import { useState } from "react";
import { GetAllGameResDto } from "@choosetale/nestia-type/lib/structures/GetAllGameResDto";
import { Page } from "@choosetale/nestia-type/lib/structures/Page";
import { Choice } from "@choosetale/nestia-type/lib/structures/Choice";
import { ExtendsPageType, IInitPage } from "@/interface/page";
import { TempGetGameResDto } from "@/actions/game/getGame";
import { TempChoiceType } from "@/components/game/builder/GameBuilderContent";

export default function useGameData({
  gameInitData,
  gameAllData,
  gameData,
}: {
  gameAllData: GetAllGameResDto;
  gameData: TempGetGameResDto;
  gameInitData: ExtendsPageType | null;
}) {
  const initGame =
    gameInitData && (new IInitPage(gameInitData) as GetAllGameResDto);

  const [gameDescription, setGameDescription] = useState(gameData);
  const [allGame, setAllGame] = useState(initGame ?? gameAllData);
  const [gamePageData, setGamePageData] = useState<Page[]>(allGame?.pages);

  const updateChoices = (pageId: number, updatedChoice: TempChoiceType) => {
    setGamePageData((prevData) =>
      prevData.map((page) =>
        page.id === pageId
          ? {
              ...page,
              choices: page.choices.map((choice) =>
                choice.id === updatedChoice.id ? updatedChoice : choice
              ),
            }
          : page
      )
    );
  };

  const addChoice = (pageId: number, choice: Choice) => {
    setGamePageData((prevData) =>
      prevData.map((page) =>
        page.id === pageId
          ? { ...page, choices: [...page.choices, choice] }
          : page
      )
    );
  };

  const deleteChoice = (pageId: number, choiceId: number) => {
    let toPageId: number | undefined;

    setGamePageData((prevData) =>
      prevData.map((page) => {
        if (page.id === pageId) {
          const updatedChoices = page.choices.filter((choice) => {
            if (choice.id === choiceId) {
              toPageId = choice.toPageId;
              return false;
            }
            return true;
          });

          return { ...page, choices: updatedChoices };
        }
        return page;
      })
    );

    if (toPageId !== undefined) deletePage(toPageId);
  };

  const addPage = ({ depth }: { depth: number }) => {
    const newPageId = gamePageData.length + 1;
    const newPage: Page = {
      id: newPageId,
      abridgement: `페이지 ${newPageId} 요약`,
      description: `페이지 ${newPageId} 내용`,
      createdAt: new Date().toISOString(),
      depth,
      choices: [],
    };

    setGamePageData((prevData: Page[]) => [...prevData, newPage]);
  };

  const updatePage = (updatedPage: Page) => {
    setGamePageData((prevData) =>
      prevData.map((page) => (page.id === updatedPage.id ? updatedPage : page))
    );
  };

  const deletePage = (pageId: number) => {
    setGamePageData((prevData) => {
      const filteredPages = prevData.filter((page) => page.id !== pageId);

      return filteredPages.map((page) => ({
        ...page,
        choices: page.choices.filter((choice) => choice.toPageId !== pageId),
      }));
    });
  };

  return {
    gamePageData,
    addPage,
    updatePage,
    deletePage,
    addChoice,
    updateChoices,
    deleteChoice,
  };
}
