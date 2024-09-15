"use client";
import Link from "next/link";
import Image from "next/image";
import { AllSidesIcon } from "@radix-ui/react-icons";
import ThemedButton from "@/components/theme/ui/ThemedButton";
import penIcon from "@asset/icon/pen.png";

export default function LandingButtonBox() {
  return (
    <>
      <Link href="/game/create">
        <ThemedButton
          variant="ghost"
          className="w-full h-auto border border-b-2 border-black gap-2"
        >
          <Image
            src={penIcon}
            width={16}
            height={16}
            className="w-4 h-4 grow-0 shirnk-0"
            alt="choice"
          />
          <p className="text-lg">게임 만들기</p>
        </ThemedButton>
      </Link>
      <Link href="/game-play/start?gameId=1">
        <ThemedButton
          variant="ghost"
          className="w-full h-auto border border-b-2 border-black gap-2"
        >
          <AllSidesIcon />
          <p className="text-lg">게임 시작</p>
        </ThemedButton>
      </Link>
    </>
  );
}
