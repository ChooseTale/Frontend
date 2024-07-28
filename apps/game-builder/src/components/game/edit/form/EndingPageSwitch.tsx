import React from "react";
import ThemedSwitch from "@/components/theme/ui/ThemedSwitch";

export default function EndingPageSwitch({
  isEnding,
  onCheckedChange,
}: {
  isEnding: boolean;
  onCheckedChange: () => void;
}) {
  return (
    <div className="flex gap-4 items-center">
      <p className="mb-0 text-sm font-bold">엔딩 페이지</p>
      <ThemedSwitch
        name="isPrivate"
        checked={isEnding}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
