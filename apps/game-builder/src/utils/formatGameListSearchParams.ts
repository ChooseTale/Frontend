export interface GameListSearchParams {
  page: string;
  genre: string;
  sort?: string;
}

export const formatGameListSearchParams = (
  searchParams: GameListSearchParams
) => {
  const defaultLimit = 10;

  return {
    page: Number(searchParams.page) || 1,
    limit: defaultLimit,
    genre: searchParams.genre,
    sort: searchParams.sort || "desc",
  };
};
