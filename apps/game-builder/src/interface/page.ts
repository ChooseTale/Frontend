import { CreateGameResDto } from "@choosetale/nestia-type/lib/structures/CreateGameResDto";
import { Page } from "@choosetale/nestia-type/lib/structures/Page";

export interface PageType {
  title: string;
  description: string;
}

export const GENRES = [
  "FANTASY",
  "SCI_FI",
  "HORROR",
  "MYSTERY",
  "ROMANCE",
  "THRILLER",
  "HISTORICAL",
  "WESTERN",
  "DYSTOPIA",
  "SATIRE",
  "BIOGRAPHY",
  "AUTOBIOGRAPHY",
  "ESSAY",
  "DRAMA",
  "POETRY",
  "COMIC",
  "NON_FICTION",
  "FICTION",
  "OTHER",
] as const;

export type GenreType = (typeof GENRES)[number];
export interface ExtendsPageType extends CreateGameResDto {
  page: {
    id: number;
    title: string;
    content: string;
    abridgement: string;
  };
}
export class IInitPage {
  id: number;
  title: string;
  pages: Page[];

  constructor(props: ExtendsPageType) {
    this.id = props.id;
    this.title = "";
    this.pages = [
      {
        ...props.page,
        id: props.page.id,
        description: props.page.content,
        createdAt: new Date().toISOString(),
        depth: 0,
        choices: [],
      },
    ];
  }
}
