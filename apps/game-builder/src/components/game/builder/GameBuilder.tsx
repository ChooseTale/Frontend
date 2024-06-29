"use client";
import ChoiceCard from "@/components/card/choice/ChoiceCard";
import PageCard from "@components/card/page/PageCard";
import StoryLine from "./StoryLine";
import GameSubmitButton from "@/components/button/GameSubmitButton";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function GameBuilder() {
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/game/confirm");
  };

  return (
    <form onSubmit={onSubmit} className="relative flex h-full px-6 pt-4">
      <StoryLine />
      <GameSubmitButton />

      <div className="flex-1 flex flex-col gap-4">
        <PageCard title="제목" description="글 내용" />
        <ChoiceCard title="선택지" description="선택지 내용" />
      </div>
    </form>
  );
}
