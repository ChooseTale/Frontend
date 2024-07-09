export default function DotIndicator({
  isChoosen,
  theme,
}: {
  isChoosen: boolean;
  theme?: string;
}) {
  const unChoosenClass =
    theme === "old-game" ? "!w-5 !h-5 -left-[16px]" : "!w-4 !h-4 -left-[8px]";
  const choosenClass =
    theme === "old-game" ? "-translate-x-[73px]" : "-translate-x-[70px]";

  return (
    <div
      className={`absolute w-3 h-3 bg-green-500 rounded-full top-1/2 -translate-y-1/2 -left-2 transition-all ${isChoosen ? choosenClass : unChoosenClass}`}
    ></div>
  );
}
