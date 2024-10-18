"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type GroupType = "date" | "game";

export default function GroupTab() {
  const [selectedGroup, setSelectedGroup] = useState<GroupType>("date");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleGroupClick = (group: GroupType) => {
    setSelectedGroup(group);
    const params = new URLSearchParams(searchParams);
    params.set("group", group);
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const group = searchParams.get("group") as GroupType;
    if (group === "date" || group === "game") {
      setSelectedGroup(group);
    }
  }, [searchParams]);

  return (
    <div className="flex justify-center pt-4 pb-3">
      <div className="p-[2px] flex bg-grey-800 rounded-lg">
        <button
          className={`w-[85px] h-[36px] rounded-lg text-black ${
            selectedGroup === "date" ? "bg-grey-50" : ""
          }`}
          onClick={() => handleGroupClick("date")}
          type="button"
        >
          날짜순
        </button>
        <button
          className={`w-[85px] h-[36px] rounded-lg text-black ${
            selectedGroup === "game" ? "bg-grey-50" : ""
          }`}
          onClick={() => handleGroupClick("game")}
          type="button"
        >
          게임순
        </button>
      </div>
    </div>
  );
}
