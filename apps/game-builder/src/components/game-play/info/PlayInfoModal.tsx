import Image from "next/image";
import { type Dispatch, type SetStateAction } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@repo/ui/components/ui/Dialog.tsx";
import type { GameIntro } from "@/interface/customType";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/packages/ui/components/ui/Button";
import GameEnrich from "@/components/game/GameEnrich";
import GameRestartButton from "@/components/button/GameRestartButton";
import logo from "@/asset/logo.png";

interface PlayInfoModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  gameIntro: GameIntro;
}

export default function PlayInfoModal({
  isOpen,
  setOpen,
  gameIntro,
}: PlayInfoModalProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen(false)}>
      <DialogContent className="sm:h-auto w-[90%] sm:w-auto rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-start pr-4">
            <Image src={logo.src} width={16} height={16} alt="로고" />
            <p className="line-clamp-2 text-left">{gameIntro.game.title}</p>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="line-clamp-6">{gameIntro.game.description}</div>
        <div>
          <div className="text-xs flex items-center gap-2">
            <InfoCircledIcon color="#28c362" />
            {t(`genre.${gameIntro.game.genre}`)}
          </div>

          <GameEnrich enrich={gameIntro.enrichData} mode="game-play" />
        </div>

        <DialogFooter className="flex flex-col gap-2">
          <GameRestartButton gameId={gameIntro.game.id} />
          <Button
            className="w-full h-auto border border-b-2 border-black gap-2 text-lg"
            variant="ghost"
            onClick={() => setOpen(false)}
          >
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
