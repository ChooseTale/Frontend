"use client";
import { useRouter } from "next/navigation";

export default function GameListSort({
  searchParams,
}: {
  searchParams: string;
}) {
  const router = useRouter();

  const createParams = (paramsString: string) =>
    new URLSearchParams(paramsString);
  const params = createParams(searchParams);
  const defaultSort = "desc";

  const handleSortChange = (newSortOrder: "asc" | "desc") => {
    const updatedParams = createParams(searchParams);
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
        onChange={(e) => handleSortChange(e.target.value as "asc" | "desc")}
      >
        <option value="asc">오래된 순</option>
        <option value="desc">최신 순</option>
      </select>
    </>
  );
}
