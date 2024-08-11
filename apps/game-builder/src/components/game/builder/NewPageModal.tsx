import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CardStackPlusIcon } from "@radix-ui/react-icons";
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
import MaxLengthText, {
  setMaxLengthOptions,
} from "@/components/common/form/MaxLengthText";

interface NewPageModalProps {
  handleNewPage: (newPageData: { content: string; isEnding: boolean }) => void;
}

const MAX_LENGTH = {
  content: 3000,
} as const;

export default function NewPageModal({ handleNewPage }: NewPageModalProps) {
  const [isOpen, setOpen] = useState(false);
  const defaultValues = {
    content: "",
    isEnding: false,
  };
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = (fieldValues) => {
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
    <>
      <button
        className="relative z-1 inline-block flex items-center gap-1 px-2 py-[3px] self-end text-xs border border-[#22c55e] text-white bg-[#22c55e] rounded-md"
        onClick={() => setOpen(true)}
      >
        <CardStackPlusIcon className="h-5 w-5" />
        <span className="mr-1">새 페이지</span>
      </button>

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
            <DialogFooter className="gap-2">
              <ThemedButton type="button" variant="ghost" onClick={onClose}>
                취소
              </ThemedButton>
              <ThemedButton type="submit">추가</ThemedButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
