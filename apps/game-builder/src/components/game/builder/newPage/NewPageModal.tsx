import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@repo/ui/components/ui/Dialog.tsx";
import type { NewPage } from "@/interface/customType";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import ThemedButton from "@/components/theme/ui/ThemedButton";
import ThemedSwitch from "@/components/theme/ui/ThemedSwitch";
import MaxLengthText, {
  setMaxLengthOptions,
} from "@/components/common/form/MaxLengthText";
import PageContentEditor from "@/components/common/editor/PageContentEditor";
import {
  emptyInitialValue,
  isValueEmpty,
} from "@/components/common/editor/contant";

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
    register,
    reset,
    formState: { errors },
    control,
    trigger,
    getValues,
    setValue,
    setError,
  } = useForm({
    defaultValues,
  });

  const handleButtonClick = async () => {
    const isValid = await trigger();
    const { content } = getValues();
    if (isValueEmpty(content)) {
      setError("content", {
        type: "required",
        message: "페이지 내용을 입력해주세요",
      });
    }

    if (isValid) {
      const fieldValues = getValues();
      handleNewPage(fieldValues);
      onClose();
    }
  };

  const onClose = () => {
    setOpen(false);
    reset();
  };

  const contentControl = useWatch({ control, name: "content" });
  const isEnding = useWatch({ control, name: "isEnding" });

  const contentMaxLengthOptions = setMaxLengthOptions(
    contentControl.length,
    MAX_LENGTH.content,
    20
  );

  const handleEditorChange = (content: string) => {
    setValue("content", content, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    register("content", {
      required: "페이지 내용을 입력해주세요",
      maxLength: {
        value: MAX_LENGTH.content,
        message: `페이지 내용을 ${formatNumberWithCommas(MAX_LENGTH.content)}자 내로 입력해주세요`,
      },
    });
  }, [register]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-screen sm:h-auto">
        <DialogHeader>
          <DialogTitle>새 페이지</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form className="space-y-4">
          <div>
            <MaxLengthText {...contentMaxLengthOptions} className="-top-5" />
            <PageContentEditor
              initialValue={emptyInitialValue}
              onChange={handleEditorChange}
              errMsg={errors.content?.message}
            />
          </div>
          <DialogFooter className="flex flex-col gap-2">
            <div className="my-2 flex gap-2 items-center flex-1">
              <ThemedSwitch name="isEnding" control={control} />
              <p className={`mb-0 text-xs ${isEnding ? "" : "opacity-50"}`}>
                엔딩 페이지
              </p>
            </div>
            <ThemedButton type="button" onClick={handleButtonClick}>
              추가
            </ThemedButton>
            <ThemedButton type="button" variant="ghost" onClick={onClose}>
              취소
            </ThemedButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
