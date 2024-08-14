export default function DotIndicator({ theme }: { theme?: string }) {
  return (
    <div
      className={`absolute w-3 h-3 flex justify-center rounded-full top-1/2 -translate-y-1/2 -left-2 -translate-x-[22px] bg-green-500 ${theme === "old-game" ? "-translate-x-[25px]" : ""}`}
    >
      <div className="mt-3 w-[1px] h-10 bg-black" />
    </div>
  );
}
