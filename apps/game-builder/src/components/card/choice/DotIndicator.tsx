import { Link1Icon } from "@radix-ui/react-icons";
import type { LinkedPage } from "@/interface/customType";

export default function DotIndicator({
  isChoosen,
  theme,
  linkedPage,
}: {
  isChoosen: boolean;
  theme?: string;
  linkedPage: LinkedPage | undefined;
}) {
  const unChoosenClass =
    theme === "old-game" ? "!w-5 !h-5 -left-[16px]" : "!w-4 !h-4 -left-[8px]";
  const choosenClass =
    theme === "old-game" ? "-translate-x-[73px]" : "-translate-x-[70px]";

  return (
    <div
      className={`absolute w-4 h-4 bg-green-500 rounded-full top-1/2 -translate-y-1/2 -left-[10px] transition-all ${isChoosen ? choosenClass : unChoosenClass}`}
    >
      {isChoosen && (
        <div className="flex items-center gap-[2px] absolute top-1/2 -translate-y-1/2 left-[2px]">
          <Link1Icon className="h-3 w-3" color="#ffffff" />
          <p className="px-1 w-14 text-xs text-green-500 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {linkedPage?.title}
          </p>
        </div>
      )}
    </div>
  );
}
