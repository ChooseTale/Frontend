import type { GetAllGameResDto } from "@choosetale/nestia-type/lib/structures/GetAllGameResDto";
import type { Choice } from "@choosetale/nestia-type/lib/structures/Choice";
import type { Page } from "@choosetale/nestia-type/lib/structures/Page";
import type { UpdateGameReqDto } from "@choosetale/nestia-type/lib/structures/UpdateGameReqDto";
import type { Genres } from "@choosetale/nestia-type/lib/structures/Genres";

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

export interface Thumbnail {
  id: number;
  url: string;
}

export interface GameInfo extends UpdateGameReqDto {
  id: number;
  title: string;
  description: string;
  isPrivate: boolean;
  genre: Genres;
  thumbnails: Thumbnail[];
  createdAt: string;
  counts: {
    pages: number;
    choices: number;
    ending: number;
  };
}
export type GameBuild = GetAllGameResDto;

interface BaseChoice extends Choice {
  title: string;
  description: string;
  source: "server" | "client";
}
interface BasePage extends Page {
  description: string;
  source: "server" | "client";
  choices: (BaseChoice | ChoiceType)[];
  isEnding: boolean;
  updatedAt: string;
}

export type PageType = BasePage & { source: "server" | "client" };
export type ChoiceType = BaseChoice & { source: "server" | "client" };
export interface GameBuildType {
  id: number;
  title: string;
  pages: PageType[];
}
export interface GameType {
  id: number;
  title: string;
  description: string;
  isPrivate: boolean;
}

export interface LinkedPage {
  pageId: number;
  content: string;
  isEnding: boolean;
}

export interface NewPage {
  content: string;
  isEnding: boolean;
}

export interface NewChoice {
  parentPageId: number;
  childPageId: number;
  title: string;
  description: string;
}

export enum MaxChoiceLengthEnum {
  DEFAULT = 4,
}

export interface GameIntro {
  game: {
    id: number;
    title: string;
    description: string;
    genre: string;
    thumbnailUrl: string;
    producer: {
      userId: number;
      nickname: string;
      profileImageUrl: string;
    };
  };
  firstPage: { id: number };
  enrichData: {
    lastUpdatedAt: string;
    totalPlayCount: number;
    expectPlayTime: number;
    completedEnding: number;
    totalEnding: number;
  };
  play: {
    id: number;
    page: {
      id: number;
      abridgement: string;
    };
  };
}

export interface GamePlay {
  playId: number;
  page?: {
    id: number;
  };
}

export interface ApiChoice extends NewChoice {
  id: number;
}

export interface ApiPage {
  id: number;
  description: string;
  tempDescription: string;
  choices: ApiChoice[];
  isEnding: boolean;
}

export interface GamePlayPage {
  playId: number;
  gameIntroData: GameIntro;
  page: ApiPage;
}

export interface ChoosenPage {
  id: number;
  abridgement: string;
  choices: [
    {
      id: number;
      title: string;
      percentage: number;
    },
  ];
}

export interface GameResult {
  endingPage: {
    id: number;
    abridgement: string;
    description: string;
  };
  choosenPages: ChoosenPage[];
}

export interface GameListGame {
  game: {
    id: number;
    title: string;
    thumbnail: {
      id: number;
      url: string;
    };
    genre: string;
    createdAt: string;
    updatedAt: string;
  };
  publisher: {
    userId: number;
    nickname: string;
    profileImage: {
      url: string;
    };
  };
  enrichData: {
    totalEndingCount: number;
    totalRechedEndingPlayCount: number;
    expectPlayTime: number;
    me: {
      isExistReachedEndingPlay: boolean;
      reachedEndingPlayCount: number;
      isExistContinuePlay: boolean;
    };
  };
}

export type GameList = GameListGame[];

export type SortType = "POPULAR" | "LATEST";
