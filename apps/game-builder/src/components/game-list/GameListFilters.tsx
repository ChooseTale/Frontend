import GameListGenresSelect from "./GameListGenresSelect";
import GameListSort from "./GameListSort";

interface FilterComponentProps {
  searchParams: string;
}

export default function GameListFilters({
  searchParams,
}: FilterComponentProps) {
  return (
    <div className="flex items-center gap-4 justify-end">
      <GameListGenresSelect searchParams={searchParams} />
      <GameListSort searchParams={searchParams} />
    </div>
  );
}
