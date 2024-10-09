"use client";
import { useState } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { type GameIntro } from "@/interface/customType";
import PlayInfoModal from "./PlayInfoModal";

export default function PlayInfo({ gameIntro }: { gameIntro: GameIntro }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className="flex justify-end"
        onClick={() => setIsOpen(true)}
        onKeyDown={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
      >
        <InfoCircledIcon width={18} height={18} />
      </div>

      <PlayInfoModal
        isOpen={isOpen}
        setOpen={setIsOpen}
        gameIntro={gameIntro}
      />
    </>
  );
}
