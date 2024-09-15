"use client";
import Link from "next/link";
import Image from "next/image";
import { AllSidesIcon } from "@radix-ui/react-icons";
import ThemedButton from "@/components/theme/ui/ThemedButton";
import penIcon from "@asset/icon/pen.png";
import TypingText from "@/components/common/text/TypingText";

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
            className="w-4 h-4 grow-0 shrink-0"
            alt="choice"
          />
          <TypingText text="게임 만들기" initialDelay={0.2} />
        </ThemedButton>
      </Link>
      <Link href="/game/1/intro">
        <ThemedButton
          variant="ghost"
          className="w-full h-auto border border-b-2 border-black gap-2"
        >
          <AllSidesIcon />
          <TypingText text="게임1 시작" initialDelay={0.75} />
        </ThemedButton>
      </Link>
    </>
  );
}
