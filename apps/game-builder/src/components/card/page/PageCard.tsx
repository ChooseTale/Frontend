import Image from "next/image";
import { CardStackPlusIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@repo/ui/components/ui/Card.tsx";
import type { PageType } from "@/interface/customType";
import ThemedCard from "@themed/ThemedCard";
import ThemedIconButton from "@themed/ThemedIconButton";
import robotIcon from "@asset/icon/robot-solid.svg";
import GameEditDraw from "@/components/game/edit/GameEditDraw";
import type useGameData from "@/hooks/useGameData";
import DotIndicator from "./DotIndicator";

interface PageCardProps {
  page: PageType;
  choicesLength: number;
  addChoice: () => void;
  addAIChoice: () => void;
  updatePage: ReturnType<typeof useGameData>["updatePage"];
  deletePage: () => void;
}

export default function PageCard({
  page,
  choicesLength,
  addChoice,
  addAIChoice,
  updatePage,
  deletePage,
}: PageCardProps) {
  const { abridgement, description } = page;

  return (
    <ThemedCard className="relative">
      <DotIndicator />

      <div className="min-h-24 flex-1">
        <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-center">
          <CardTitle
            className={`mb-2 !text-[16px] break-all ${choicesLength < 4 ? "" : "pr-6"}`}
          >
            {abridgement}
          </CardTitle>
          <CardDescription className="text-xs line-clamp-4 mb-0 break-all">
            {description}
          </CardDescription>
        </CardContent>
      </div>

      <CardFooter className="flex items-center p-0 pt-2 gap-1">
        {choicesLength < 4 && (
          <>
            <ThemedIconButton onClick={addChoice}>
              <CardStackPlusIcon className="h-8 w-8" />
            </ThemedIconButton>
            <ThemedIconButton onClick={addAIChoice}>
              <Image
                className="h-8 w-8 -translate-y-[2px]"
                src={robotIcon}
                alt="generate choice"
              />
            </ThemedIconButton>
          </>
        )}
      </CardFooter>

      <GameEditDraw page={page} updatePage={updatePage} />

      <ThemedIconButton
        className="absolute h-4 w-4 right-10 top-[10px]"
        onClick={deletePage}
      >
        <TrashIcon className="h-4 w-4" />
      </ThemedIconButton>
    </ThemedCard>
  );
}
