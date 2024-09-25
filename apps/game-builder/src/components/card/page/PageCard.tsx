import Image from "next/image";
import {
  CardStackPlusIcon,
  ReloadIcon,
  StopwatchIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@repo/ui/components/ui/Card";
import type { PageType } from "@/interface/customType";
import type useGameData from "@/hooks/useGameData";
import { removeEditorTags } from "@/utils/removeEditorTags";
import ThemedCard from "@themed/ThemedCard";
import ThemedIconButton from "@themed/ThemedIconButton";
import robotIcon from "@asset/icon/robot-solid.svg";
import GameEditDraw from "@/components/game/edit/GameEditDraw";
import DateDisplayRelative from "@/components/common/text/DateDisplayRelative";
import DotIndicator from "./DotIndicator";

interface PageCardProps {
  page: PageType;
  choicesLength: number;
  addChoice: () => void;
  genAIChoice: () => void;
  updatePage: ReturnType<typeof useGameData>["updatePageData"];
  deletePage: () => void;
  isGenerating: boolean;
}

export default function PageCard({
  page,
  choicesLength,
  addChoice,
  genAIChoice,
  updatePage,
  deletePage,
  isGenerating,
}: PageCardProps) {
  const { abridgement, description, isEnding } = page;
  const showChoiceButtons = choicesLength < 4 && !isEnding;

  return (
    <div className="pt-4" id={`page-${page.id}`}>
      <ThemedCard className={`relative ${isEnding ? "bg-green-100" : ""}`}>
        <DotIndicator />

        <div className="min-h-24 flex-1">
          <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-center">
            <CardTitle
              className={`mb-2 !text-[16px] break-all ${showChoiceButtons ? "" : "pr-6"}`}
            >
              {abridgement !== "" ? (
                removeEditorTags(abridgement)
              ) : (
                <span className="opacity-20">요약이 없습니다</span>
              )}
            </CardTitle>
            <CardDescription className="text-xs line-clamp-4 mb-0 break-all">
              {removeEditorTags(description)}
            </CardDescription>
          </CardContent>
        </div>

        <CardFooter
          className={`flex items-center p-0 pt-2 gap-1 ${isEnding ? "flex-col justify-center items-end" : ""}`}
        >
          {showChoiceButtons && (
            <>
              <ThemedIconButton onClick={addChoice}>
                <CardStackPlusIcon className="h-8 w-8" />
              </ThemedIconButton>
              <div
                className={`min-w-[40px] ${isGenerating ? "pointer-events-none cursor-default animate-pulse duration-1000" : ""}`}
              >
                {isGenerating ? (
                  <ThemedIconButton onClick={genAIChoice}>
                    <ReloadIcon className="h-6 w-6 animate-spin" />
                  </ThemedIconButton>
                ) : (
                  <ThemedIconButton onClick={genAIChoice}>
                    <Image
                      className="h-8 w-8 -translate-y-[2px]"
                      src={robotIcon}
                      alt="generate choice"
                    />
                  </ThemedIconButton>
                )}
              </div>
            </>
          )}

          <div
            className={`${showChoiceButtons ? "absolute" : ""} bottom-3 right-3 text-xs opacity-50 flex items-center gap-1`}
          >
            <StopwatchIcon className="w-3 h-3" />
            <DateDisplayRelative date={page.updatedAt} />
          </div>
          {isEnding && (
            <div className="flex items-center justify-end text-xs opacity-50">
              엔딩 페이지
            </div>
          )}
        </CardFooter>

        <GameEditDraw page={page} updatePage={updatePage} />

        <ThemedIconButton
          className="absolute h-4 w-4 right-10 top-[6px]"
          onClick={deletePage}
        >
          <TrashIcon className="h-4 w-4" />
        </ThemedIconButton>
      </ThemedCard>
    </div>
  );
}
