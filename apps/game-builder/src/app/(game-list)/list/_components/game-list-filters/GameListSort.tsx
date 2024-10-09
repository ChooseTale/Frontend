"use client";
import { type SortType } from "@/interface/customType";
import { type FormattedSearchParams } from "@/utils/formatGameListSearchParams";

interface GameListSelectProps {
  searchParams: FormattedSearchParams;
  handleSortChange: (newSort: string) => void;
}

export default function GameListSort({
  searchParams,
  handleSortChange,
}: GameListSelectProps) {
  const defaultSort = searchParams.sort;

  const sortId = "sortSelect";
  const sorts: { value: SortType; option: string }[] = [
    { value: "LATEST", option: "최신순" },
    { value: "POPULAR", option: "인기순" },
  ];

  return (
    <select
      id={sortId}
      value={searchParams.sort || defaultSort}
      onChange={(e) => handleSortChange(e.target.value as SortType)}
      className="bg-transparent body pl-2 pr-1 h-full"
    >
      {sorts.map(({ value, option }) => (
        <option key={value} value={value}>
          {option}
        </option>
      ))}
    </select>
  );
}
