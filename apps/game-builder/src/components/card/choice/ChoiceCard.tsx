"use client";
import { useState } from "react";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Choice } from "@choosetale/nestia-type/lib/structures/Choice";
import { CardContent, CardFooter } from "@repo/ui/components/ui/Card.tsx";
import ThemedCard from "@themed/ThemedCard";
import ThemedIconButton from "@themed/ThemedIconButton";
import { TempChoiceType } from "@/components/game/builder/GameBuilderContent";
import ThemedInputField from "@/components/theme/ui/ThemedInputField";
import ThemedTextareaField from "@/components/theme/ui/ThemedTextareaField";
import DotIndicator from "./DotIndicator";
import { StaticChoice } from "./StaticChoice";

interface PageCardProps {
  choice: Choice;
  defaultCommitted: boolean;
  commitChoice: (partialChoice: TempChoiceType) => void;
  removeChoice: () => void;
}

export default function ChoiceCard({
  choice,
  defaultCommitted,
  commitChoice,
  removeChoice,
}: PageCardProps) {
  const fakeDefultChoice = {
    title: "테스트용 기본 값",
    description: "테스트용 기본 설명",
  } as any;

  const [isCommitted, setIsCommitted] = useState(defaultCommitted);
  const [formData, setFormData] = useState({
    ...choice,
    title: "",
    description: "",
  });

  const clickCommit = () => {
    commitChoice(formData);
    setIsCommitted(!isCommitted);
  };

  const clickRemove = () => {
    removeChoice();
  };

  return (
    <ThemedCard className="relative min-h-24 !ml-12" isChoice={true}>
      <DotIndicator isChoosen={isCommitted} />

      <div className="flex-1">
        <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-center">
          {isCommitted && <StaticChoice {...fakeDefultChoice} />}

          {!isCommitted && (
            <>
              <ThemedInputField
                name="title"
                placeholder="선택지 제목"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <ThemedTextareaField
                name="description"
                placeholder="선택지 내용"
                rows={2}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </>
          )}
        </CardContent>
      </div>

      <CardFooter className="flex items-center p-0 pr-4 pt-2 gap-1">
        {!isCommitted && (
          <ThemedIconButton onClick={clickCommit}>
            <CheckIcon className="h-8 w-8" />
          </ThemedIconButton>
        )}
        <ThemedIconButton onClick={clickRemove}>
          <Cross2Icon className="h-8 w-8" />
        </ThemedIconButton>
      </CardFooter>
    </ThemedCard>
  );
}
