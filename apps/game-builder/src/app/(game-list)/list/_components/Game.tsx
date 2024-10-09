"use client";
import { useState } from "react";
import type { GameListGame } from "@/interface/customType";
import GameIntroModal from "@/app/(game-list)/list/_components/game-intro-modal/GameIntroModal";
import { Dialog, DialogTrigger } from "@/packages/ui/components/ui/Dialog";
import GameListCard from "./game-list-card/GameListCard";

export default function Game({ gameData }: { gameData: GameListGame }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogTrigger className="text-left">
        <GameListCard gameData={gameData} />
      </DialogTrigger>

      <GameIntroModal gameData={gameData} isOpen={isOpen} />
    </Dialog>
  );
}
