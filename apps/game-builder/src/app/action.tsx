"use server";
import * as type from "@choosetale/nestia-type";

type formFields = Record<string, string>;

export const createGame = async (formData: formFields) => {
  const create = type.functional.game.create;
  const gameaa = type.default.functional.game;
  const game = {
    title: formData.title,
    pageOneContent: formData.pageOneContent,
  };
  console.log(game);

  try {
    return await create({ host: "http://localhost:5001/" }, game);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};
