"use client";
import { useState } from "react";
import ErrorHandlingImage from "@/components/common/image/ImageWithError";
import { useTranslation } from "@/hooks/useTranslation";
import { formatDateString } from "@/utils/formatDatestring";
import { type EndedGameGroupGame } from "@/interface/customType";
import ChevronDownIcon from "@asset/icons/chevron-down.svg";

interface EndedGameCardProps {
  endedGame: EndedGameGroupGame;
}

export default function GroupGameEndedGameCard({
  endedGame,
}: EndedGameCardProps) {
  const { t } = useTranslation();
  const TEMP_SRC = "";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-grey-800 rounded-md overflow-hidden">
      <div className="flex gap-3 p-4">
        <div className="w-[3.75rem]">
          <div className="bg-green-800 h-6 flex items-center justify-center rounded-md mb-2">
            <p className="text-caption text-green-100 font-semibold">
              엔딩 {endedGame.game.endings.length}/
              {endedGame.game.totalEndingCount}
            </p>
          </div>
          <div className="relative w-full pb-[100%] rounded-md overflow-hidden bg-grey-200">
            <ErrorHandlingImage src={TEMP_SRC} alt={endedGame.game.title} />
          </div>
        </div>

        <div className="h-[5.5rem] flex-1 flex flex-col justify-end">
          <div className="h-[3.75rem] pt-2">
            <p className="headline line-clamp-2">{endedGame.game.title}</p>
            <p className="caption text-grey-200 text-thin">
              {t(`genre.${endedGame.game.genre}`)}
            </p>
          </div>
        </div>

        <div className="w-6 shrink-0 flex items-center justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="outline-none"
            type="button"
          >
            <div
              className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            >
              <ChevronDownIcon stroke="#a4a4a4" />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-2 border-t border-grey-800">
          {endedGame.game.endings.map((ending) => (
            <li
              className="flex px-4 py-5 active:bg-[rgba(255,255,255,0.05)]"
              key={ending.playId}
            >
              <p className="w-[4.375rem] text-body text-grey-200 text-thin">
                {formatDateString(ending.reachedEndingAt)}
              </p>
              <div className="ml-4 flex flex-col">
                <p className="body text-green-500 font-semibold">
                  {ending.playId}번 엔딩
                </p>
                <p className="body text-grey-100 text-thin">
                  {ending.abridgement}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
