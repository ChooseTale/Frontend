import Link from "next/link";
import { type ContinuedGame as ContinuedGameType } from "@/interface/customType";
import ChevronRightIcon from "@asset/icons/chevron-right.svg";
import ContinuedGameCard from "./ContinuedGameCard";

interface ContinuedGameProps {
  continuedGame: ContinuedGameType[];
}

export default function ContinuedGame({ continuedGame }: ContinuedGameProps) {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between mx-5">
          <p className="text-title font-semibold">진행중인 게임</p>
          <Link href="/my-page/continued-game" className="flex items-center">
            <span className="text-body text-grey-300 mb-[2px]">전체보기</span>
            <ChevronRightIcon
              stroke="#a4a4a4"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            />
          </Link>
        </div>

        <div className="overflow-x-auto ml-5">
          <div className="flex gap-4">
            {continuedGame?.map((data) => (
              <ContinuedGameCard continuedGame={data} key={data.game.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
