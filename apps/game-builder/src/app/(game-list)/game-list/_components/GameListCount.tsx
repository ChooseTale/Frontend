"use client";
import { useEffect, useState } from "react";
import type { Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import { getGameListCount } from "@/actions/list/getGameListCount";

export default function GameListCount({ genre }: { genre: Genres }) {
  const [genreCount, setGenreCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGameListCount = async () => {
      try {
        const response = await getGameListCount({
          genre,
        });

        if (response.success) {
          setGenreCount(response.count);
        } else {
          throw new Error("Failed to fetch game list count");
        }
      } catch (err) {
        setError("An error occurred while fetching the game list count.");
      }
    };
    fetchGameListCount();
  }, [genre]);

  return (
    <>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {genreCount !== null ? <p className="text-sm">{genreCount} 개</p> : null}
    </>
  );
}
