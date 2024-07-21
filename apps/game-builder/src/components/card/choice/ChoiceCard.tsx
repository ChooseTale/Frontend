"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { CardContent, CardFooter } from "@repo/ui/components/ui/Card.tsx";
import ThemedCard from "@themed/ThemedCard";
import ThemedIconButton from "@themed/ThemedIconButton";
import { TempChoiceType } from "@/components/game/builder/GameBuilderContent";
import ThemedInputField from "@/components/theme/ui/ThemedInputField";
import ThemedTextareaField from "@/components/theme/ui/ThemedTextareaField";
import DotIndicator from "./DotIndicator";
import { StaticChoice } from "./StaticChoice";

interface PageCardProps {
  choice: TempChoiceType;
  defaultFixed: boolean;
  fixChoice: (partialChoice: TempChoiceType) => void;
  removeChoice: () => void;
}

export default function ChoiceCard({
  choice,
  defaultFixed,
  fixChoice,
  removeChoice,
}: PageCardProps) {
  const [isFixed, setIsFixed] = useState(defaultFixed);

  const defaultValues = {
    ...choice,
    title: choice.title ?? "",
    description: choice.description ?? "",
  };
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (formData: typeof defaultValues) => {
    fixChoice(formData);
    setIsFixed(!isFixed);
  };

  const clickRemove = () => {
    removeChoice();
  };

  if (isFixed) {
    return <StaticChoice {...getValues()} removeChoice={clickRemove} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ThemedCard className="relative min-h-24 !ml-12" isChoice={true}>
        <DotIndicator isChoosen={isFixed} />

        <div className="flex-1">
          <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-center">
            <ThemedInputField
              placeholder="선택지 제목"
              labelText=""
              {...register("title", { required: true })}
              className={`${errors["title"] ? "border-red-500" : ""}`}
            />
            <ThemedTextareaField
              placeholder="선택지 내용"
              labelText=""
              rows={2}
              {...register("description", { required: true })}
              className={`${errors["description"] ? "border-red-500" : ""}`}
            />
          </CardContent>
        </div>

        <CardFooter className="flex items-center p-0 pr-4 pt-2 gap-1">
          {!isFixed && (
            <ThemedIconButton type="submit">
              <CheckIcon className="h-8 w-8" />
            </ThemedIconButton>
          )}
          <ThemedIconButton onClick={clickRemove}>
            <Cross2Icon className="h-8 w-8" />
          </ThemedIconButton>
        </CardFooter>
      </ThemedCard>
    </form>
  );
}
