"use client";
import { useState } from "react";
import type { GameListGame } from "@/interface/customType";
import GameIntroModal from "@/components/game-list/game-intro-modal/GameIntroModal";
import GameListCard from "@/components/game-list/game-list-card/GameListCard";
import { Dialog, DialogTrigger } from "@/packages/ui/components/ui/Dialog";

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
