"use client";
import Link from "next/link";
import ThemedButton from "@/components/button/ThemedButton";

export default function Page(): JSX.Element {
  return (
    <main className="flex-1 flex items-center justify-center">
      <Link href="/game/create">
        <ThemedButton>Game Builder</ThemedButton>
      </Link>
    </main>
  );
}
