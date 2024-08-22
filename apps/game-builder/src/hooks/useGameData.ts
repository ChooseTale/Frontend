"use client";
import { useState } from "react";
import { NewGameBuild } from "@/interface/newGameData";
import type { ExtendsCreateGameResDto } from "@/interface/newGameData";
import type {
  ChoiceType,
  GameBuild,
  GameBuildType,
  NewChoice,
  PageType,
} from "@/interface/customType";
import { getGameAllById } from "@/actions/game/getGame";
import { createPage } from "@/actions/page/createPage";
import { updatePage } from "@/actions/page/updatePage";
import { deletePage } from "@/actions/page/deletePage";
import { createChoice } from "@/actions/choice/createChoice";
import { updateChoice } from "@/actions/choice/updateChoice";
import { deleteChoice } from "@/actions/choice/deleteChoice";

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
  const gameId = game.id;

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

  const deletePageData = async (pageId: number) => {
    const result = await deletePage(gameBuildData.id, pageId);

    if (result.success) {
      setGamePageList((prevData) => {
        const filteredPages = prevData.filter((page) => page.id !== pageId);

        return filteredPages.map((page) => ({
          ...page,
          choices: page.choices.filter(
            (choice: ChoiceType) => choice.toPageId !== pageId
          ),
        }));
      });
    }
  };

  const addChoiceData = async (pageId: number, choice: NewChoice) => {
    const result = await createChoice(gameBuildData.id, choice);

    if (result.success) {
      const newChoice: ChoiceType = {
        ...choice,
        source: "server",
        fromPageId: choice.parentPageId,
        toPageId: choice.childPageId,
        id: result.choice.id,
        createdAt: new Date().toISOString(),
      };
      setGamePageList((prevData: PageType[]) =>
        prevData.map((page) =>
          page.id === pageId
            ? {
                ...page,
                choices: [...page.choices, newChoice],
              }
            : page
        )
      );
    }
    return result.success;
  };

  const updateChoicesData = async (
    pageId: number,
    choiceId: number,
    choiceData: NewChoice
  ) => {
    const result = await updateChoice(gameBuildData.id, choiceId, choiceData);

    if (result.success) {
      const newChoice: ChoiceType = {
        ...choiceData,
        source: "server",
        fromPageId: choiceData.parentPageId,
        toPageId: choiceData.childPageId,
        id: result.choice.id,
        createdAt: new Date().toISOString(),
      };
      setGamePageList((prevData: PageType[]) =>
        prevData.map((page) =>
          page.id === pageId
            ? {
                ...page,
                choices: page.choices.map((choice) =>
                  choice.id === newChoice.id ? newChoice : choice
                ),
              }
            : page
        )
      );
    }
  };

  const deleteChoiceData = async (pageId: number, choiceId: number) => {
    const result = await deleteChoice(gameBuildData.id, choiceId);

    if (result.success) {
      setGamePageList((prevData) =>
        prevData.map((page) => {
          if (page.id === pageId) {
            const updatedChoices = page.choices.filter((choice) => {
              if (choice.id === choiceId) {
                return false;
              }
              return true;
            });

            return { ...page, choices: updatedChoices };
          }
          return page;
        })
      );
    }
  };

  const reloadGameData = async () => {
    const gameAllResponse = await getGameAllById(gameId);
    if (gameAllResponse.success) {
      const gameData = setGameWithSource(gameAllResponse.gameAll, "server");
      setGamePageList(gameData.pages);
    }
  };

  return {
    gamePageList,
    addPageData,
    updatePageData,
    deletePageData,
    addChoiceData,
    updateChoicesData,
    deleteChoiceData,
    reloadGameData,
  };
}
