import type { CreateGameResDto } from "@choosetale/nestia-type/lib/structures/CreateGameResDto";
import type { PageType } from "./customType";

export interface ExtendsCreateGameResDto extends CreateGameResDto {
  page: {
    id: number;
    title: string;
    content: string;
    abridgement: string;
  };
  isPrivate: boolean;
}
export class NewGameBuild {
  id: number;
  title: string;
  pages: PageType[];
  isPrivate: boolean;
  description: string;

  constructor(props: ExtendsCreateGameResDto) {
    this.id = props.id;
    this.title = "";
    this.description = "";
    this.isPrivate = false;
    this.pages = [
      {
        ...props.page,
        choices: [],
        createdAt: new Date().toISOString(),
        depth: 0,
        description: props.page.content,
        id: props.page.id,
        isEnding: false,
        source: "client",
        updatedAt: new Date().toISOString(),
      },
    ];
  }
}
