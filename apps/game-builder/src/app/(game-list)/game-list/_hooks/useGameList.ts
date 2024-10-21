"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/axios/axios";
import { type GameList as GameListType } from "@/interface/customType";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export default function useGameList() {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");
  const sort = searchParams.get("sort");
  const [gameList, setGameList] = useState<GameListType>([]);
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 6;

  const fetchGameList = useCallback(
    async (pageNum: number) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/game-play/list`, {
          params: {
            page: pageNum,
            limit,
            genre,
            sort,
          },
        });
        const responseGameList = response.data as GameListType;

        if (responseGameList?.length) {
          setGameList((prevList) => [...prevList, ...responseGameList]);
          setHasMore(responseGameList.length === limit);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        setError("An error occurred while fetching the game list.");
      } finally {
        setLoading(false);
      }
    },
    [genre, sort]
  );

  const callback = useCallback(() => {
    fetchGameList(page);
    setPage((prevPage) => prevPage + 1);
  }, [page, fetchGameList]);

  const observerRef = useInfiniteScroll({
    callback,
    isLoading: loading,
    hasMore,
  });

  useEffect(() => {
    setGameList([]);
    setPage(1);
    setHasMore(true);
  }, [genre, sort]);

  return { observerRef, gameList, loading, error, hasMore, page };
}
