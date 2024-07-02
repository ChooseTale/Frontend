"use client";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@repo/ui/components/ui/Card.tsx";
import ThemedCard from "@themed/ThemedCard";
import ThemedIconButton from "@themed/ThemedIconButton";
import DotIndicator from "./DotIndicator";
import { useState } from "react";
import GameEditDraw from "@/components/game/edit/GameEditDraw";

interface PageCardProps {
  title: string;
  description: string;
}

export default function ChoiceCard({ title, description }: PageCardProps) {
  const [isChoosen, setIsChoosen] = useState(false);
  const fixChoice = () => {
    setIsChoosen(!isChoosen);
    console.log("선택 결정");
  };
  const removeChoice = () => {
    console.log("선택 삭제");
  };

  return (
    <ThemedCard className="relative min-h-24 !ml-12" isChoice={true}>
      <DotIndicator isChoosen={isChoosen} />

      <div className="flex-1">
        <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-center">
          <CardTitle className="mb-1 !text-[14px]">{title}</CardTitle>
          <CardDescription className="text-xs line-clamp-4 mb-0">
            {description}
          </CardDescription>
        </CardContent>
      </div>

      <CardFooter className="flex items-center p-0 pr-4 pt-2 gap-1">
        <ThemedIconButton onClick={fixChoice}>
          <CheckIcon className="h-8 w-8" />
        </ThemedIconButton>
        <ThemedIconButton onClick={removeChoice}>
          <Cross2Icon className="h-8 w-8" />
        </ThemedIconButton>
      </CardFooter>

      <GameEditDraw />
    </ThemedCard>
  );
}
