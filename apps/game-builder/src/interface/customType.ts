import { GetAllGameResDto } from "@choosetale/nestia-type/lib/structures/GetAllGameResDto";
import { Choice } from "@choosetale/nestia-type/lib/structures/Choice";
import { Page } from "@choosetale/nestia-type/lib/structures/Page";
import { UpdateGameReqDto } from "@choosetale/nestia-type/lib/structures/UpdateGameReqDto";

interface Thumbnail {
  id: number;
  url: string;
}
export interface GameInfo extends UpdateGameReqDto {
  id: number;
  counts: {
    pages: number;
    choices: number;
    ending: number;
  };
  thumbnails: Thumbnail[];
  createdAt: string;
}
export interface GameBuild extends GetAllGameResDto {}

interface BaseChoice extends Choice {
  title: string;
  description: string;
  source: "server" | "client";
}
interface BasePage extends Page {
  title: string;
  description: string;
  source: "server" | "client";
  choices: BaseChoice[];
}

export type PageType = BasePage & { source: "server" | "client" };
export type ChoiceType = BaseChoice & { source: "server" | "client" };
export interface GameType {
  id: number;
  title: string;
  pages: PageType[];
}

export interface LinkedPage {
  pageId: number;
  title: string;
}
