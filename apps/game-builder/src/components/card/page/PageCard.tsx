import Image from "next/image";
import { CardStackPlusIcon } from "@radix-ui/react-icons";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@repo/ui/components/ui/Card.tsx";
import ThemedCard from "@themed/ThemedCard";
import ThemedIconButton from "@themed/ThemedIconButton";
import DotIndicator from "./DotIndicator";
import robotIcon from "@asset/icon/robot-solid.svg";
import GameEditDraw from "@/components/game/edit/GameEditDraw";

interface PageCardProps {
  abridgement: string;
  description: string;
}

export default function PageCard({ abridgement, description }: PageCardProps) {
  const addPageAndChoice = () => {
    console.log("POST /game/{gameId}/page 카드 추가");
    console.log("(hidden) 페이지 데이터 추가");
    console.log("선택지 카드 UI 추가");
  };
  const addPageAndChoiceByAI = () => {
    console.log("POST /game/{gameId}/page 카드 추가");
    console.log("(hidden) 페이지 데이터 추가");
    console.log("GET /game/{gameId}/page/{pageId}/recommend-choices");
    console.log("선택지 카드 추가 🤖");
  };

  return (
    <ThemedCard className="relative">
      <DotIndicator />

      <div className="min-h-24 flex-1">
        <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-center">
          <CardTitle className="mb-1 !text-[16px]">{abridgement}</CardTitle>
          <CardDescription className="text-xs line-clamp-4 mb-0">
            {description}
          </CardDescription>
        </CardContent>
      </div>

      <CardFooter className="flex items-center p-0 pr-4 pt-2 gap-1">
        <ThemedIconButton onClick={addPageAndChoice}>
          <CardStackPlusIcon className="h-8 w-8" />
        </ThemedIconButton>
        <ThemedIconButton onClick={addPageAndChoiceByAI}>
          <Image
            className="h-8 w-8 -translate-y-[2px]"
            src={robotIcon}
            alt="generate choice"
          />
        </ThemedIconButton>
      </CardFooter>

      <GameEditDraw />
    </ThemedCard>
  );
}
