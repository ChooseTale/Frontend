import type { Dispatch, SetStateAction } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@repo/ui/components/ui/Dialog.tsx";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import ThemedButton from "@/components/theme/ui/ThemedButton";
import ThemedTextareaField from "@/components/theme/ui/ThemedTextareaField";
import ThemedSwitch from "@/components/theme/ui/ThemedSwitch";
import MaxLengthText, {
  setMaxLengthOptions,
} from "@/components/common/form/MaxLengthText";
import type { NewPage } from "@/interface/customType";

interface NewPageModalProps extends ReturnType<typeof useForm<NewPage>> {
  handleNewPage: (newPageData: { content: string; isEnding: boolean }) => void;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const MAX_LENGTH = {
  content: 3000,
} as const;

export default function NewPageModal({
  handleNewPage,
  isOpen,
  setOpen,
}: NewPageModalProps) {
  const defaultValues = {
    content: "",
    isEnding: false,
  };
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues,
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = (
    fieldValues,
    event
  ) => {
    event?.stopPropagation();
    handleNewPage(fieldValues);
    onClose();
  };

  const onClose = () => {
    setOpen(false);
    reset();
  };

  const contentLen = watch("content").length || 0;
  const contentMaxLengthOptions = setMaxLengthOptions(
    contentLen,
    MAX_LENGTH.content,
    20
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby="add new page">
        <DialogHeader>
          <DialogTitle>새 페이지</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <MaxLengthText {...contentMaxLengthOptions} className="top-0" />
            <ThemedTextareaField
              labelText="내용"
              placeholder="페이지의 내용을 입력하세요"
              rows={10}
              maxLength={MAX_LENGTH.content}
              {...register("content", {
                required: "페이지 내용을 입력해주세요",
                maxLength: {
                  value: MAX_LENGTH.content,
                  message: `페이지 내용을 ${formatNumberWithCommas(MAX_LENGTH.content)}자 내로 입력해주세요`,
                },
              })}
              autoComplete="off"
              errMsg={errors.content?.message}
              className={
                contentMaxLengthOptions.isLessThan ? "text-red-500" : ""
              }
            />
          </div>
          <DialogFooter className="flex flex-col gap-2">
            <div className="my-2 flex gap-2 items-center flex-1">
              <ThemedSwitch name="isEnding" control={control} />
              <p
                className={`mb-0 text-xs ${watch("isEnding") ? "" : "opacity-50"}`}
              >
                엔딩 페이지
              </p>
            </div>
            <ThemedButton type="submit">추가</ThemedButton>
            <ThemedButton type="button" variant="ghost" onClick={onClose}>
              취소
            </ThemedButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
