"use server";
import * as type from "@choosetale/nestia-type";
import { CreateGameReqDto } from "@choosetale/nestia-type/lib/structures/CreateGameReqDto";
import { CreateGameResDto } from "@choosetale/nestia-type/lib/structures/CreateGameResDto";

interface SuccessResponse {
  success: true;
  game: CreateGameResDto;
}

interface ErrorResponse {
  success: false;
  error: type.HttpError | Error;
}

type CreateGameResponse = SuccessResponse | ErrorResponse;

export const createGame = async (
  formData: CreateGameReqDto
): Promise<CreateGameResponse> => {
  const create = type.functional.game.create;
  console.log(formData);

  return {
    success: true,
    game: {
      id: 0,
      page: {
        id: 1,
        title: "title",
        content: "content",
      },
    },
  };

  try {
    const res = await create({ host: "http://localhost:5001/" }, formData);
    return { success: true, game: res };
  } catch (error) {
    return { success: false, error: error as type.HttpError };
  }
};
