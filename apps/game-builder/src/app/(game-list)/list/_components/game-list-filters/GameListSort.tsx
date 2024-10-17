"use client";
import type { GameListOption } from "@/interface/customType";
import { type FormattedSearchParams } from "@/utils/formatGameListSearchParams";

interface GameListSelectProps {
  searchParams: FormattedSearchParams;
  handleSortChange: (newSort: string) => void;
  option: GameListOption;
}

export default function GameListSort({
  searchParams,
  handleSortChange,
  option,
}: GameListSelectProps) {
  const defaultSort = searchParams.sort;

  const sortId = "sortSelect";
  const sorts = option.sorts.map((sort) => ({
    value: sort.value,
    optionLabel: sort.optionLabel,
  }));

  return (
    <select
      id={sortId}
      value={searchParams.sort || defaultSort}
      onChange={(e) => handleSortChange(e.target.value)}
      className="bg-transparent body pl-2 pr-1 h-full"
    >
      {sorts.map(({ value, optionLabel }) => (
        <option key={value} value={value}>
          {optionLabel}
        </option>
      ))}
    </select>
  );
}
