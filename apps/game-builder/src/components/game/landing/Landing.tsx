"use client";
import Link from "next/link";
import Image from "next/image";
import ThemedButton from "@/components/theme/ui/ThemedButton";
import logo from "@/asset/logo.png";

export default function Landing() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <Image src={logo.src} width={72} height={72} alt="로고" />
        <Link href="/game/create">
          <ThemedButton variant="ghost" className="h-auto">
            <p className="text-lg underline">게임 만들기</p>
          </ThemedButton>
        </Link>
        <Link href="/game-play/start?gameId=1">
          <ThemedButton variant="ghost" className="h-auto">
            <p className="text-lg underline">게임 시작</p>
          </ThemedButton>
        </Link>
      </div>
    </>
  );
}
