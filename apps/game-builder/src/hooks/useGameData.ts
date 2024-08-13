"use client";
import { useState } from "react";
import { NewGameBuild } from "@/interface/newGameData";
import type { ExtendsCreateGameResDto } from "@/interface/newGameData";
import type {
  ChoiceType,
  GameBuild,
  GameBuildType,
  PageType,
} from "@/interface/customType";
import { createPage } from "@/actions/page/createPage";
import { updatePage } from "@/actions/page/updatePage";

const setGameWithSource = (
  gameData: GameBuild,
  source: PageType["source"]
): GameBuildType => {
  const pagesWithTag = gameData.pages.map((page) => {
    const choicesWithTag = page.choices.map((choice) => ({
      ...choice,
      source,
    })) as ChoiceType[];

    return {
      ...page,
      choices: choicesWithTag,
      source,
    } as PageType;
  });

  return {
    ...gameData,
    pages: pagesWithTag,
    source,
    description: "",
    isPrivate: false,
  } as GameBuildType;
};

export default function useGameData({
  createdGame,
  gameBuildData,
}: {
  createdGame: ExtendsCreateGameResDto | null;
  gameBuildData: GameBuild;
}) {
  const newGame: GameBuildType | null =
    createdGame && new NewGameBuild(createdGame);
  const game = setGameWithSource(gameBuildData, "server");
  const [gamePageList, setGamePageList] = useState(
    newGame?.pages ?? game.pages
  );

  const addPageData = async ({
    depth,
    pageData,
  }: {
    depth: number;
    pageData: { content: string; isEnding: boolean };
  }) => {
    const res = await createPage(gameBuildData.id, pageData);

    if (res.success) {
      const newPage: PageType = {
        abridgement: "",
        choices: [],
        createdAt: new Date().toISOString(),
        depth,
        description: pageData.content,
        id: res.page.id,
        isEnding: pageData.isEnding,
        source: "client",
        updatedAt: new Date().toISOString(),
      };

      setGamePageList((prevData: PageType[]) => [...prevData, newPage]);
      return { id: res.page.id };
    }
  };

  const updatePageData = async (pageId: number, updatedPage: PageType) => {
    const { abridgement, description, isEnding } = updatedPage;
    if (!abridgement || !description || isEnding === undefined) return;

    const res = await updatePage(gameBuildData.id, pageId, {
      abridgement,
      content: description,
      isEnding,
    });

    if (res.success) {
      setGamePageList((prevData) =>
        prevData.map((page) =>
          page.id === updatedPage.id ? { ...page, ...updatedPage } : page
        )
      );
    }
  };

  const updateChoicesData = (pageId: number, updatedChoice: ChoiceType) => {
    setGamePageList((prevData: PageType[]) =>
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

  const addChoiceData = (pageId: number, choice: ChoiceType) => {
    setGamePageList((prevData: PageType[]) =>
      prevData.map((page) =>
        page.id === pageId
          ? { ...page, choices: [...page.choices, choice] }
          : page
      )
    );
  };

  const deleteChoiceData = (pageId: number, choiceId: number) => {
    let toPageId: number | undefined;

    setGamePageList((prevData) =>
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

    if (toPageId !== undefined) deletePageData(toPageId);
  };

  const deletePageData = (pageId: number) => {
    setGamePageList((prevData) => {
      const filteredPages = prevData.filter((page) => page.id !== pageId);

      return filteredPages.map((page) => ({
        ...page,
        choices: page.choices.filter(
          (choice: ChoiceType) => choice.toPageId !== pageId
        ),
      }));
    });
  };

  return {
    gamePageList,
    addPageData,
    updatePageData,
    deletePageData,
    addChoiceData,
    updateChoicesData,
    deleteChoiceData,
  };
}
