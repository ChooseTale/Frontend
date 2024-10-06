"use client";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { type GameList as GameListType } from "@/interface/customType";
import { getGameList } from "@/actions/list/getGameList";
import {
  type GameListSearchParams,
  formatGameListSearchParams,
} from "@/utils/formatGameListSearchParams";
import GameListCard from "./GameListCard";

export default function GameList({ firstList }: { firstList: GameListType }) {
  const searchParams = useSearchParams();
  const [gameList, setGameList] = useState<GameListType>(firstList);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const formattedSearchParams = useMemo(() => {
    const params = Object.fromEntries(
      searchParams
    ) as unknown as GameListSearchParams;

    return formatGameListSearchParams(params);
  }, [searchParams]);

  useEffect(() => {
    const fetchGameList = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getGameList(formattedSearchParams);
        if (response.success) {
          setGameList(response.gameList);
        } else {
          throw new Error("Failed to fetch game list");
        }
      } catch (err) {
        setError("An error occurred while fetching the game list.");
      } finally {
        setLoading(false);
      }
    };

    fetchGameList();
  }, [formattedSearchParams]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {gameList.map((e) => (
        <GameListCard gameData={e} key={e.game.id} />
      ))}
      {loading && <p className="text-center">Loading...</p>}
    </>
  );
}
