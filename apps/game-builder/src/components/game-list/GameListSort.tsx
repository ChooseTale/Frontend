"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { type SortType } from "@/interface/customType";
import { type FormattedSearchParams } from "@/utils/formatGameListSearchParams";

interface GameListSelectProps {
  searchParams: FormattedSearchParams;
}

export default function GameListSort({ searchParams }: GameListSelectProps) {
  const router = useRouter();
  const params = useSearchParams();

  const defaultSort = searchParams.sort;

  const handleSortChange = (newSortOrder: SortType) => {
    const updatedParams = new URLSearchParams(params);
    updatedParams.set("sort", newSortOrder);
    router.push(`?${updatedParams.toString()}`);
  };

  const sortId = "sortSelect";

  return (
    <>
      <label htmlFor={sortId}>정렬</label>
      <select
        id={sortId}
        value={params.get("sort") || defaultSort}
        onChange={(e) => handleSortChange(e.target.value as SortType)}
      >
        <option value="LASTEST">최신 순</option>
        <option value="POPULAR">인기 순</option>
      </select>
    </>
  );
}
