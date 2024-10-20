"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type GroupType = "building" | "published";

export default function GroupTab() {
  const [selectedGroup, setSelectedGroup] = useState<GroupType>("building");
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
    if (group === "published" || group === "building") {
      setSelectedGroup(group);
    }
  }, [searchParams]);

  return (
    <div className="flex justify-center pt-4 pb-3">
      <div className="p-[2px] flex bg-grey-800 rounded-lg">
        <button
          className={`w-[85px] h-[36px] rounded-lg text-black ${
            selectedGroup === "building" ? "bg-grey-50" : ""
          }`}
          onClick={() => handleGroupClick("building")}
          type="button"
        >
          제작중
        </button>
        <button
          className={`w-[85px] h-[36px] rounded-lg text-black ${
            selectedGroup === "published" ? "bg-grey-50" : ""
          }`}
          onClick={() => handleGroupClick("published")}
          type="button"
        >
          게시중
        </button>
      </div>
    </div>
  );
}
