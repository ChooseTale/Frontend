import Link from "next/link";
import PlusIcon from "@asset/icons/plus.svg";

export default function NewGameButton() {
  return (
    <div className="absolute left-1/2 bottom-6 -translate-x-1/2 z-10">
      <Link href="/builder/create">
        <button
          className="h-[50px] w-[140px] bg-green-500 flex justify-center items-center gap-[2px] rounded-full"
          type="button"
        >
          <PlusIcon stroke="#ffffff" className="-ml-1" />
          <p className="text-headline">새 게임</p>
        </button>
      </Link>
    </div>
  );
}
