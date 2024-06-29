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
