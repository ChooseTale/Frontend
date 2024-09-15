"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Cross2Icon,
  Link2Icon,
  Pencil2Icon,
  PlusCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { CardContent, CardFooter } from "@repo/ui/components/ui/Card";
import type { ChoiceType, LinkedPage } from "@/interface/customType";
import type useGameData from "@/hooks/useGameData";
import { removeEditorTags } from "@/utils/removeEditorTags";
import ThemedCard from "@themed/ThemedCard";
import ThemedIconButton from "@themed/ThemedIconButton";
import ThemedInputField from "@/components/theme/ui/ThemedInputField";
import ThemedTextareaField from "@/components/theme/ui/ThemedTextareaField";
import NewPage from "@/components/game/builder/newPage/NewPage";
import DotIndicator from "./DotIndicator";
import { StaticChoice } from "./StaticChoice";

interface PageCardProps {
  choice: ChoiceType;
  defaultFixed: boolean;
  removeChoice: () => void;
  availablePages: LinkedPage[];
  linkedPage: LinkedPage | undefined;
  handleFixChoice: (partialChoice: ChoiceType) => void;
  addPageData: ReturnType<typeof useGameData>["addPageData"];
}

export default function ChoiceCard({
  choice,
  defaultFixed,
  handleFixChoice,
  removeChoice,
  availablePages,
  linkedPage,
  addPageData,
}: PageCardProps) {
  const [isFixed, setIsFixed] = useState(defaultFixed);
  const isSavedChoice = defaultFixed;

  const defaultValues = {
    ...choice,
    title: choice.title,
    description: choice.description,
  };
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    setValue,
    watch,
    setError,
  } = useForm({ defaultValues });

  const onSubmit = (formData: typeof defaultValues) => {
    setError("toPageId", {});
    const toPageId = Number(formData.toPageId);

    if (toPageId < 0) {
      setError("toPageId", { message: "연결할 페이지를 선택하세요" });
      return;
    }
    const newChoice = {
      ...formData,
      toPageId: Number(formData.toPageId),
    };
    handleFixChoice(newChoice);
    setIsFixed(!isFixed);
  };

  const handleNewPageOnChoice = async (newPageData: {
    content: string;
    isEnding: boolean;
  }) => {
    const res = await addPageData({ depth: -1, pageData: newPageData });
    const pageId = res?.id;

    pageId && setValue("toPageId", pageId);
  };
  const handleRemove = () => {
    if (confirm("선택지를 삭제 하시겠습니까?")) removeChoice();
  };
  const handleEdit = () => {
    setIsFixed(false);
  };
  const handleCancel = () => {
    setIsFixed(true);
    reset(choice);
  };

  if (isFixed) {
    return (
      <StaticChoice
        {...getValues()}
        removeChoice={handleRemove}
        editChoice={handleEdit}
        linkedPage={linkedPage}
      />
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
      <ThemedCard className="relative min-h-24 !ml-12" isChoice>
        <DotIndicator isChoosen={isFixed} />

        <div className="flex-1">
          <CardContent className="py-2 !pb-3 px-4 sm:p-6 h-full flex flex-col justify-center">
            <ThemedInputField
              placeholder="선택지 제목"
              labelText=""
              {...register("title", { required: true })}
              className={`${errors.title ? "border-red-500" : ""}`}
            />
            <ThemedTextareaField
              placeholder="선택지 내용"
              labelText=""
              rows={2}
              {...register("description", { required: true })}
              className={`${errors.description ? "border-red-500" : ""}`}
            />

            <div className="flex items-center gap-2 justify-end mt-2">
              <Link2Icon className="h-5 w-5" />
              <select
                {...register("toPageId", { required: true })}
                className={`p-2 shadow-sm border rounded-sm text-xs w-full ${errors.toPageId ? "border-red-500" : ""} ${watch("toPageId") ? "bg-gray-100" : ""}`}
                value={watch("toPageId") || -1}
              >
                <option value="-1">연결할 페이지를 선택하세요</option>
                {availablePages
                  .filter((page) => page.pageId !== choice.fromPageId)
                  .map((page) => (
                    <option key={page.pageId} value={page.pageId}>
                      {removeEditorTags(page.content.slice(0, 50))} (
                      {page.pageId})
                    </option>
                  ))}
              </select>
            </div>
          </CardContent>
        </div>

        <CardFooter className="flex flex-col justify-end items-center p-0 pr-4 py-4 gap-2">
          <ThemedIconButton
            type="submit"
            className="!absolute top-1 right-1 min-w-6 p-0 min-h-0 px-2 py-[2px]"
          >
            <Pencil2Icon className="h-4 w-4" />
          </ThemedIconButton>
          {isSavedChoice && (
            <ThemedIconButton onClick={handleCancel}>
              <Cross2Icon className="h-6 w-6" />
            </ThemedIconButton>
          )}

          <NewPage handleNewPage={handleNewPageOnChoice}>
            <PlusCircledIcon className="h-5 w-5 m-[1px] cursor-pointer" />
          </NewPage>

          <ThemedIconButton onClick={handleRemove}>
            <TrashIcon className="h-5 w-5 m-[1px]" />
          </ThemedIconButton>
        </CardFooter>
      </ThemedCard>
    </form>
  );
}
