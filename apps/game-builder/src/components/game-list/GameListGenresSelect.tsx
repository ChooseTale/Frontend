import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { type Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import { type GameInfo } from "@/interface/customType";
import GenresSelect from "../game/confirm/form/GenresSelect";

interface GameListGenresSelectProps {
  searchParams: string;
}

const createParams = (paramsString: string) =>
  new URLSearchParams(paramsString);

export default function GameListGenresSelect({
  searchParams,
}: GameListGenresSelectProps) {
  const router = useRouter();
  const params = createParams(searchParams);

  const defaultValues = { genre: (params.get("genre") as Genres) || "all" };
  const { control } = useForm<Partial<GameInfo>>({
    defaultValues,
  });
  const genre = useWatch({ control, name: "genre" });

  const handleFilterChange = useCallback(
    (newGenre: string) => {
      const updatedParams = createParams(searchParams);
      const newGenreLowerCase = newGenre.toLowerCase();

      if (newGenreLowerCase === "all") {
        updatedParams.delete("genre");
      } else {
        updatedParams.set("genre", newGenreLowerCase);
      }
      router.push(`?${updatedParams.toString()}`);
    },
    [searchParams, router]
  );

  useEffect(() => {
    if (genre) {
      handleFilterChange(genre);
    }
  }, [genre, handleFilterChange]);

  const sortId = "genresSelect";

  return (
    <>
      <label htmlFor={sortId}>장르</label>
      <GenresSelect
        id={sortId}
        name="genre"
        labelText=""
        control={control}
        hasSelectAll
      />
    </>
  );
}
