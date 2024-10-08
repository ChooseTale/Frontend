"use client";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { type GameList as GameListType } from "@/interface/customType";
import { getGameList } from "@/actions/list/getGameList";
import {
  type GameListSearchParams,
  formatGameListSearchParams,
} from "@/utils/formatGameListSearchParams";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Game from "@/app/(game-list)/_components/Game";

export default function GameList({ firstList }: { firstList: GameListType }) {
  const searchParams = useSearchParams();
  const [gameList, setGameList] = useState<GameListType>(firstList);
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 4;
  const callback = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const observerRef = useInfiniteScroll({
    callback,
    isLoading: loading,
    hasMore,
  });

  const searchParamsString = searchParams.toString();
  useEffect(() => {
    setGameList(firstList);
    setPage(1);
    setHasMore(true);
  }, [searchParamsString, firstList]);

  const formattedSearchParams = useMemo(() => {
    const params = Object.fromEntries(
      searchParams
    ) as unknown as GameListSearchParams;

    return formatGameListSearchParams(params);
  }, [searchParams]);

  useEffect(() => {
    const fetchGameList = async (pageNum: number) => {
      setLoading(true);
      setError(null);

      try {
        const response = await getGameList({
          ...formattedSearchParams,
          page: pageNum,
          limit,
        });
        if (response.success) {
          setGameList((prevList) => [...prevList, ...response.gameList]);
          if (response.gameList.length < limit) {
            setHasMore(false);
          }
        } else {
          throw new Error("Failed to fetch game list");
        }
      } catch (err) {
        setError("An error occurred while fetching the game list.");
      } finally {
        setLoading(false);
      }
    };

    if (page > 1) {
      fetchGameList(page);
    }
  }, [formattedSearchParams, page]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!loading && gameList.length === 0) {
    return <div className="text-center">해당되는 게임이 없습니다</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-6">
        {gameList?.map((e) => <Game gameData={e} key={e.game.id} />)}
      </div>
      <div ref={observerRef} style={{ height: "1px" }} />
      {loading && <p className="text-center">Loading...</p>}
    </div>
  );
}
